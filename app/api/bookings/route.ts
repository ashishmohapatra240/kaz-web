import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/booking';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
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