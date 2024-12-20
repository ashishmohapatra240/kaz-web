import { NextRequest, NextResponse } from 'next/server';
import { Booking } from '@/app/models/booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';

interface QueryParams {
    $or?: Array<{ [key: string]: { $regex: string, $options: string } }>;
    status?: string;
    isMarked?: boolean;
    plan?: string;
}

export async function GET(
    request: NextRequest
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const isMarked = searchParams.get('isMarked') || '';
        const plan = searchParams.get('plan') || '';

        // Build query
        const query: QueryParams = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ];
        }

        if (status) {
            query.status = status;
        }

        if (isMarked === 'true' || isMarked === 'false') {
            query.isMarked = isMarked === 'true';
        }

        if (plan) {
            query.plan = plan;
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const total = await Booking.countDocuments(query);

        // Get bookings with pagination
        const bookings = await Booking.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            bookings,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit
            }
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ message: 'Error fetching bookings' }, { status: 500 });
    }
}