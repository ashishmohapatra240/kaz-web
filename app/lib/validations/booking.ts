import { PLAN_TYPES } from '@/src/components/sections/Hero/constants/plan';
import { z } from 'zod';

export const bookingSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    persons: z.string().transform((val) => parseInt(val, 10)),
    preferableDate: z.string().datetime(),
    plan: z.enum(PLAN_TYPES as unknown as [string, ...string[]], {
        errorMap: () => ({ message: 'Please select a valid plan' }),
    }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;