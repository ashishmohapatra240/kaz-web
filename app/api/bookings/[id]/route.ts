import { NextRequest, NextResponse } from 'next/server';
import { Booking } from '@/app/models/booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';

interface UpdateData {
    status?: string;
    isMarked?: boolean;
    $push?: { notes: { content: string; createdBy: string; createdAt: Date } };
    $set?: { 'notes.$.content': string };
    $pull?: { notes: { _id: string } };
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { id: bookingId } = await params;
        const body = await request.json();

        const updateData: UpdateData = {};

        // Handle status update
        if (body.status) {
            updateData.status = body.status;
        }

        // Handle mark/unmark
        if (typeof body.isMarked === 'boolean') {
            updateData.isMarked = body.isMarked;
        }

        // Handle notes
        if (body.noteAction) {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
            }

            switch (body.noteAction) {
                case 'add':
                    updateData.$push = {
                        notes: {
                            content: body.note,
                            createdBy: session.user.name || session.user.email,
                            createdAt: new Date()
                        }
                    };
                    break;

                case 'update':
                    updateData.$set = {
                        'notes.$.content': body.note
                    };
                    await Booking.updateOne(
                        {
                            _id: bookingId,
                            'notes._id': body.noteId
                        },
                        updateData
                    );
                    const updatedBooking = await Booking.findById(bookingId);
                    return NextResponse.json({ booking: updatedBooking });

                case 'delete':
                    updateData.$pull = {
                        notes: { _id: body.noteId }
                    };
                    break;
            }
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            updateData,
            { new: true }
        );

        if (!updatedBooking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ booking: updatedBooking });
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ message: 'Error updating booking' }, { status: 500 });
    }
}