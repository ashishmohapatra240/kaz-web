import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

interface BookingQuery {
    $or?: { [key: string]: { $regex: string, $options: string } }[];
    status?: string;
    isMarked?: boolean;
}

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const isMarked = searchParams.get('isMarked') || '';

        const query: BookingQuery = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { plan: { $regex: search, $options: 'i' } }
            ];
        }

        if (status) query.status = status;
        if (isMarked) query.isMarked = isMarked === 'true';

        const total = await Booking.countDocuments(query);
        const bookings = await Booking.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
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
        return NextResponse.json(
            { message: 'Error fetching bookings', error },
            { status: 500 }
        );
    }
}