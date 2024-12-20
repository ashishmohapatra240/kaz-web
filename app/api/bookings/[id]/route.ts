import { NextRequest, NextResponse } from 'next/server';
import { Booking } from '@/app/models/booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { slug } = await params;
        const body = await request.json();

        const booking = await Booking.findByIdAndUpdate(slug, { $set: body }, { new: true });

        if (!booking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ message: 'Error updating booking' }, { status: 500 });
    }
}