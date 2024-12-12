"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaChevronDown, FaUser, FaPhone } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { PLAN_TYPES } from "@/src/constants/plan";

type PlanType = (typeof PLAN_TYPES)[number];

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    persons: "2",
    preferableDate: null as Date | null,
    plan: "Day Trek" as PlanType,
  });

  const inputGroupClass = "relative flex items-center";
  const inputClass =
    "w-full px-3 py-2.5 pl-9 bg-gray-50 rounded-md text-sm outline-none border border-gray-200 focus:border-primary transition-colors placeholder:text-gray-400";
  const iconClass = "absolute left-3 text-gray-400";
  const selectClass =
    "w-full px-3 py-2.5 pl-9 pr-8 bg-gray-50 rounded-md text-sm appearance-none outline-none border border-gray-200 focus:border-primary transition-colors";

  return (
    <div className="bg-white/95 p-6 rounded-lg w-full shadow-xl backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-[#389844] rounded-full" />
        <h3 className="text-lg font-semibold text-gray-800">Quick Booking</h3>
      </div>

      <div className="space-y-4">
        {/* Name & Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div className={inputGroupClass}>
            <FaUser size={14} className={iconClass} />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={inputClass}
              placeholder="Your Name"
            />
          </div>
          <div className={inputGroupClass}>
            <FaPhone size={14} className={iconClass} />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className={inputClass}
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Plan & Persons */}
        <div className="grid grid-cols-2 gap-3">
          <div className={inputGroupClass}>
            <svg
              className={iconClass}
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
              className={selectClass}
            >
              {PLAN_TYPES.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <FaChevronDown
              className="absolute right-3 text-gray-400 pointer-events-none"
              size={12}
            />
          </div>

          <div className={inputGroupClass}>
            <svg
              className={iconClass}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <select
              value={formData.persons}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, persons: e.target.value }))
              }
              className={selectClass}
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Person{i !== 0 && "s"}
                </option>
              ))}
            </select>
            <FaChevronDown
              className="absolute right-3 text-gray-400 pointer-events-none"
              size={12}
            />
          </div>
        </div>

        {/* Prominent Date Picker */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferable Date
          </label>
          <div className="flex items-center border border-gray-200 rounded-md p-2 bg-gray-50 focus-within:border-primary transition-colors">
            <FaCalendarAlt size={16} className="text-gray-400 mr-2" />
            <DatePicker
              selected={formData.preferableDate}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  preferableDate: date as Date,
                }))
              }
              placeholderText="Select preferred date"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-[#389844] hover:bg-[#389844]/90 text-white font-medium 
                     py-3 rounded-md transition-all duration-200 text-sm hover:shadow-lg
                     active:transform active:scale-[0.99]"
        >
          Book Now →
        </button>
      </div>
    </div>
  );
};
