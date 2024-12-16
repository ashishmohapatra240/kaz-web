"use client";

import { useState } from "react";
import { FaCalendarAlt, FaUser, FaPhone } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PLAN_TYPES } from "./constants/plan";
import dayjs from "dayjs";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  persons: z.string().transform((val) => parseInt(val, 10)),
  preferableDate: z.string().datetime(),
  plan: z.enum(PLAN_TYPES as unknown as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a valid plan" }),
  }),
});

type PlanType = (typeof PLAN_TYPES)[number];
// type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    persons: "2",
    preferableDate: null as dayjs.Dayjs | null,
    plan: "Meyamali peak camp & Trek" as PlanType,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputGroupClass = "relative flex flex-col";
  const inputClass = (
    fieldName: string
  ) => `w-full px-3 py-2.5 pl-9 bg-gray-50 rounded-md text-sm outline-none border 
    transition-colors placeholder:text-gray-400 ${
      errors[fieldName]
        ? "border-red-500"
        : "border-gray-200 focus:border-primary"
    }`;
  const selectClass = (
    fieldName: string
  ) => `w-full px-3 py-2.5 pl-9 pr-8 bg-gray-50 rounded-md text-sm appearance-none outline-none border 
    transition-colors ${
      errors[fieldName]
        ? "border-red-500"
        : "border-gray-200 focus:border-primary"
    }`;

  const validateForm = () => {
    try {
      bookingSchema.parse({
        ...formData,
        preferableDate: formData.preferableDate?.toISOString(),
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path.join(".");
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          preferableDate: formData.preferableDate?.toISOString(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400) {
          const newErrors: Record<string, string> = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
          return;
        }
        throw new Error("Failed to submit booking");
      }

      // Reset form and errors
      setFormData({
        name: "",
        phone: "",
        persons: "2",
        preferableDate: null,
        plan: "Meyamali peak camp & Trek",
      });
      setErrors({});
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/95 p-6 rounded-lg w-full shadow-xl backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-[#389844] rounded-full" />
        <h3 className="text-lg font-semibold text-gray-800">Quick Booking</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div className={inputGroupClass}>
            <div className="relative">
              <FaUser
                size={14}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className={inputClass("name")}
                placeholder="Your Name"
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">{errors.name}</span>
            )}
          </div>

          <div className={inputGroupClass}>
            <div className="relative">
              <FaPhone
                size={14}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className={inputClass("phone")}
                placeholder="Phone Number"
              />
            </div>
            {errors.phone && (
              <span className="text-red-500 text-xs mt-1">{errors.phone}</span>
            )}
          </div>
        </div>

        {/* Plan & Persons */}
        <div className="grid grid-cols-2 gap-3">
          <div className={inputGroupClass}>
            <div className="relative">
              <svg
                className="absolute left-3 top-3 text-gray-400"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <select
                value={formData.plan}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    plan: e.target.value as PlanType,
                  }))
                }
                className={selectClass("plan")}
              >
                {PLAN_TYPES.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
            {errors.plan && (
              <span className="text-red-500 text-xs mt-1">{errors.plan}</span>
            )}
          </div>

          <div className={inputGroupClass}>
            <div className="relative">
              <FaUser
                size={14}
                className="absolute left-3 top-3 text-gray-400"
              />
              <select
                value={formData.persons}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, persons: e.target.value }))
                }
                className={selectClass("persons")}
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Person{i !== 0 && "s"}
                  </option>
                ))}
              </select>
            </div>
            {errors.persons && (
              <span className="text-red-500 text-xs mt-1">
                {errors.persons}
              </span>
            )}
          </div>
        </div>

        {/* Date Picker */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferable Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formData.preferableDate}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  preferableDate: date,
                }))
              }
              minDate={dayjs()}
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
                  error: !!errors.preferableDate,
                  helperText: errors.preferableDate,
                  InputProps: {
                    startAdornment: (
                      <FaCalendarAlt className="text-gray-400 mr-2" size={16} />
                    ),
                  },
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgb(249 250 251)",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: errors.preferableDate
                          ? "#ef4444"
                          : "rgb(229 231 235)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#389844",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#389844",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px 14px",
                      paddingLeft: "8px",
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#389844] hover:bg-[#389844]/90 text-white font-medium
                     py-3 rounded-md transition-all duration-200 text-sm hover:shadow-lg
                     active:transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Booking..." : "Book Now →"}
        </button>
      </form>
    </div>
  );
};
