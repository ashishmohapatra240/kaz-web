import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    persons: {
        type: Number,
        required: [true, 'Number of persons is required'],
    },
    preferableDate: {
        type: Date,
        required: [true, 'Preferable date is required'],
    },
    plan: {
        type: String,
        required: [true, 'Plan type is required'],
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    notes: [{
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: String
    }],
    isMarked: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);