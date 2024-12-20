import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    content: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now }
});

const bookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    persons: Number,
    preferableDate: Date,
    plan: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    notes: [noteSchema],
    isMarked: { type: Boolean, default: false },
    lastUpdated: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);