import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';

interface Note {
    _id: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    createdBy: string;
}

export async function PATCH(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const { id } = context.params;
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await request.json();

        const booking = await Booking.findById(id);
        if (!booking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        // Handle add/update/delete notes
        if (body.noteAction) {
            switch (body.noteAction) {
                case 'add':
                    if (body.note) {
                        booking.notes.push({
                            content: body.note,
                            createdBy: session.user.email,
                        });
                    }
                    break;
                case 'update':
                    if (body.noteId !== undefined && body.note) {
                        const noteIndex = booking.notes.findIndex((n: Note) => n._id.toString() === body.noteId);
                        if (noteIndex !== -1) {
                            booking.notes[noteIndex].content = body.note;
                            booking.notes[noteIndex].lastUpdated = new Date();
                        }
                    }
                    break;
                case 'delete':
                    if (body.noteId !== undefined) {
                        booking.notes = booking.notes.filter((n: Note) => n._id.toString() !== body.noteId);
                    }
                    break;
            }
        }

        // Handle other booking updates
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
