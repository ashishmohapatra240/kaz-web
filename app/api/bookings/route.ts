import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/booking';
import { RateLimiter } from 'limiter';

// Create a map to store rate limiters for each IP
const limiters = new Map<string, RateLimiter>();

// Function to get or create a rate limiter for an IP
const getRateLimiter = (ip: string) => {
    if (!limiters.has(ip)) {
        limiters.set(
            ip,
            new RateLimiter({
                tokensPerInterval: 3,
                interval: "minute",
                fireImmediately: true
            })
        );
    }
    return limiters.get(ip)!;
};

export async function POST(request: Request) {
    try {
        // Get client's IP address
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'anonymous';

        // Get rate limiter for this IP
        const limiter = getRateLimiter(ip);

        // Try to get a token
        const hasToken = await limiter.tryRemoveTokens(1);

        if (!hasToken) {
            return NextResponse.json(
                {
                    message: 'Rate limit exceeded. Please try again later.',
                    error: 'TOO_MANY_REQUESTS'
                },
                { status: 429 }
            );
        }

        await connectDB();
        const body = await request.json();

        const booking = await Booking.create({
            name: body.name,
            phone: body.phone,
            persons: parseInt(body.persons),
            preferableDate: body.preferableDate,
            plan: body.plan,
        });

        return NextResponse.json(
            { message: 'Booking created successfully', booking },
            { status: 201 }
        );
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { message: 'Error creating booking', error },
            { status: 500 }
        );
    }
}