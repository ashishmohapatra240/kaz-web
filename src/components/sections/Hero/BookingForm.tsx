"use client";

import { useState } from "react";
import { FaCalendarAlt, FaUser, FaPhone } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// Example plan types
export const PLAN_TYPES = [
  "Meyamali peak camp & Trek",
  "Another Plan",
  "Yet Another Plan"
] as const;

type PlanType = (typeof PLAN_TYPES)[number];

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    persons: "2",
    preferableDate: null as dayjs.Dayjs | null,
    plan: "Meyamali peak camp & Trek" as PlanType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Replace with your deployed Google Apps Script Web App URL
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxZeNL4kURXeBMZ0E-rmHB2Nwq7B3K8bjNaGwiCEaov0ID73NdcM4Uz6QbKIqq6aIn0/exec";

  const inputGroupClass = "relative flex items-center";
  const inputClass =
    "w-full px-3 py-2.5 pl-9 bg-gray-50 rounded-md text-sm outline-none border border-gray-200 focus:border-primary transition-colors placeholder:text-gray-400";
  const selectClass =
    "w-full px-3 py-2.5 pl-9 pr-8 bg-gray-50 rounded-md text-sm appearance-none outline-none border border-gray-200 focus:border-primary transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.preferableDate) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    const formattedData = {
      name: formData.name,
      phone: formData.phone,
      persons: formData.persons,
      preferableDate: formData.preferableDate?.format("YYYY-MM-DD"),
      plan: formData.plan,
    };

    console.log("Attempting to submit:", formattedData);
    console.log("To URL:", GOOGLE_SHEET_URL);

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // If you face CORS issues, try adding mode: "no-cors".
        mode: "no-cors",
        body: JSON.stringify(formattedData),
      });
      console.log("Response:", response);

      // If you used no-cors, response might be opaque. Without no-cors:
      const result = await response.json();
      console.log("Result from server:", result);

      if (result.result === "success") {
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          persons: "2",
          preferableDate: null,
          plan: "Meyamali peak camp & Trek",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
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
            <FaUser size={14} className="absolute left-3 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className={inputClass}
              placeholder="Your Name"
            />
          </div>
          <div className={inputGroupClass}>
            <FaPhone size={14} className="absolute left-3 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className={inputClass}
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Plan & Persons */}
        <div className="grid grid-cols-2 gap-3">
          <div className={inputGroupClass}>
            <svg
              className="absolute left-3 text-gray-400"
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
              className={selectClass}
            >
              {PLAN_TYPES.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          <div className={inputGroupClass}>
            <select
              value={formData.persons}
              onChange={(e) => setFormData((prev) => ({ ...prev, persons: e.target.value }))}
              className={selectClass}
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Person{i !== 0 && "s"}
                </option>
              ))}
            </select>
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
              onChange={(date) => setFormData((prev) => ({ ...prev, preferableDate: date }))}
              minDate={dayjs()}
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
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
                        borderColor: "rgb(229 231 235)",
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
                popper: {
                  sx: {
                    "& .MuiPaper-root": {
                      borderRadius: "8px",
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    },
                    "& .MuiPickersDay-root": {
                      borderRadius: "8px",
                      "&.Mui-selected": {
                        backgroundColor: "#389844",
                        "&:hover": {
                          backgroundColor: "#389844",
                        },
                      },
                    },
                    "& .MuiDayCalendar-weekDayLabel": {
                      color: "#389844",
                    },
                    "& .MuiPickersCalendarHeader-root": {
                      "& .MuiIconButton-root": {
                        color: "#389844",
                      },
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
          className={`w-full bg-[#389844] hover:bg-[#389844]/90 text-white font-medium 
                     py-3 rounded-md transition-all duration-200 text-sm hover:shadow-lg
                     active:transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? "Submitting..." : "Book Now →"}
        </button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <p className="text-green-600 text-sm text-center">
            Booking submitted successfully!
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-600 text-sm text-center">
            Failed to submit booking. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};
