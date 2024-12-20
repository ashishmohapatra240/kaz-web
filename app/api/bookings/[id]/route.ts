import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { NextRequest } from 'next/server';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await request.json();
        const booking = await Booking.findById(params.id);

        if (!booking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        // Handle notes
        if (body.note) {
            booking.notes.push({
                content: body.note,
                createdBy: session.user.email
            });
        }

        // Update other fields
        if (body.status) booking.status = body.status;
        if (typeof body.isMarked !== 'undefined') booking.isMarked = body.isMarked;

        booking.lastUpdated = new Date();
        await booking.save();

        return NextResponse.json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        console.error('Update booking error:', error);
        return NextResponse.json(
            { message: 'Error updating booking', error },
            { status: 500 }
        );
    }
} 