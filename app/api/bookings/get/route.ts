import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/booking';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        // Check if user is authenticated and is admin
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();
        const bookings = await Booking.find({}).sort({ createdAt: -1 });

        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching bookings', error },
            { status: 500 }
        );
    }
}