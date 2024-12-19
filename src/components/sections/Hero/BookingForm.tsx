"use client";

import { useState } from "react";
import { FaCalendarAlt, FaUser, FaPhone } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PLAN_TYPES } from "./constants/plan";
import dayjs from "dayjs";
import { z } from "zod";
import toast from "react-hot-toast";
import { useMobileMenu } from "@/src/context/MobileMenuContext";

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
  const { isMenuOpen } = useMobileMenu();

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

    const bookingPromise = fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        preferableDate: formData.preferableDate?.toISOString(),
      }),
    });

    toast
      .promise(
        bookingPromise,
        {
          loading: "Booking your adventure...",
          success: (response: Response) => {
            if (!response.ok) throw new Error();

            // Reset form and errors
            setFormData({
              name: "",
              phone: "",
              persons: "2",
              preferableDate: null,
              plan: "Meyamali peak camp & Trek",
            });
            setErrors({});

            return "Booking successful! Get ready for your adventure!";
          },
          error: "Something went wrong. Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 5000,
            icon: "🎉",
          },
          error: {
            duration: 4000,
            icon: "😔",
          },
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-opacity duration-300
                    ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="bg-white/95 backdrop-blur-md p-3 sm:p-5 rounded-2xl shadow-2xl border border-gray-100 
                    hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-3 sm:mb-5">
          <div className="w-1.5 h-6 bg-[#389844] rounded-full" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Quick Booking</h3>
          <div className="ml-auto hidden sm:block">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              24/7 Booking Available
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            {/* Name & Phone - now always side by side */}
            <div className="col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
              <div className={inputGroupClass}>
                <div className="relative group">
                  <FaUser size={14} className="absolute left-3 top-3 text-gray-400 group-hover:text-[#389844] 
                                             transition-colors duration-200" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={`${inputClass("name")} hover:border-[#389844]/50 focus:ring-2 
                              focus:ring-[#389844]/20 transition-all duration-200`}
                    placeholder="Your Name"
                  />
                </div>
                {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
              </div>

              <div className={inputGroupClass}>
                <div className="relative group">
                  <FaPhone size={14} className="absolute left-3 top-3 text-gray-400 group-hover:text-[#389844] 
                                             transition-colors duration-200" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className={`${inputClass("phone")} hover:border-[#389844]/50 focus:ring-2 
                              focus:ring-[#389844]/20 transition-all duration-200`}
                    placeholder="Phone Number"
                  />
                </div>
                {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
              </div>
            </div>

            {/* Plan & Persons - side by side on mobile */}
            <div className="col-span-1">
              <div className={inputGroupClass}>
                <div className="relative group">
                  <svg
                    className="absolute left-3 top-3 text-gray-400 group-hover:text-[#389844] 
                            transition-colors duration-200"
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
                    onChange={(e) => setFormData((prev) => ({ ...prev, plan: e.target.value as PlanType }))}
                    className={`${selectClass("plan")} hover:border-[#389844]/50 focus:ring-2 
                              focus:ring-[#389844]/20 transition-all duration-200`}
                  >
                    {PLAN_TYPES.map((plan) => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                </div>
                {errors.plan && <span className="text-red-500 text-xs mt-1">{errors.plan}</span>}
              </div>
            </div>
            <div className="col-span-1">
              <div className={inputGroupClass}>
                <div className="relative group">
                  <FaUser size={14} className="absolute left-3 top-3 text-gray-400 group-hover:text-[#389844] 
                                         transition-colors duration-200" />
                  <select
                    value={formData.persons}
                    onChange={(e) => setFormData((prev) => ({ ...prev, persons: e.target.value }))}
                    className={`${selectClass("persons")} hover:border-[#389844]/50 focus:ring-2 
                              focus:ring-[#389844]/20 transition-all duration-200`}
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Person{i !== 0 && "s"}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.persons && <span className="text-red-500 text-xs mt-1">{errors.persons}</span>}
              </div>
            </div>

            {/* Date Picker - full width on mobile */}
            <div className="col-span-2 sm:col-span-1">
              <div className="relative">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formData.preferableDate}
                    onChange={(date) => setFormData((prev) => ({ ...prev, preferableDate: date }))}
                    minDate={dayjs()}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        fullWidth: true,
                        error: !!errors.preferableDate,
                        helperText: errors.preferableDate,
                        InputProps: {
                          startAdornment: (
                            <FaCalendarAlt className="text-gray-400 group-hover:text-[#389844] mr-2" size={16} />
                          ),
                        },
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "rgb(249 250 251)",
                            fontSize: "0.875rem",
                            transition: "all 0.2s",
                            "&:hover": {
                              "& fieldset": {
                                borderColor: "rgba(56, 152, 68, 0.5)",
                              },
                            },
                            "& fieldset": {
                              borderColor: errors.preferableDate ? "#ef4444" : "rgb(229 231 235)",
                            },
                            "&.Mui-focused": {
                              "& fieldset": {
                                borderColor: "#389844",
                                boxShadow: "0 0 0 4px rgba(56, 152, 68, 0.1)",
                              },
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
            </div>
          </div>

          {/* Submit Button - adjusted padding for mobile */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#389844] hover:bg-[#389844]/90 text-white font-medium
                     py-2.5 sm:py-3.5 rounded-xl transition-all duration-300 text-sm hover:shadow-lg
                     hover:shadow-[#389844]/20 transform hover:-translate-y-0.5
                     active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:shadow-none disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Booking...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Book Now
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
