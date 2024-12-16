"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";

interface Booking {
  _id: string;
  name: string;
  phone: string;
  persons: number;
  preferableDate: string;
  plan: string;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings/get");
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session?.user?.role !== "admin") {
      router.push("/unauthorized");
    }

    if (session?.user?.role === "admin") {
      fetchBookings();
    }
  }, [session, status, router]);

  const stats = {
    totalBookings: bookings.length,
    totalPersons: bookings.reduce((acc, booking) => acc + booking.persons, 0),
    uniquePlans: new Set(bookings.map((b) => b.plan)).size,
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <motion.div className="text-center mb-8" {...fadeIn}>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bookings Dashboard
          </h1>
          <button
            onClick={fetchBookings}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform"
          >
            Refresh
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          {...fadeIn}
        >
          {[
            {
              title: "Total Bookings",
              value: stats.totalBookings,
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
              icon: <FaCalendarAlt className="w-5 h-5" />,
            },
            {
              title: "Total Persons",
              value: stats.totalPersons,
              bgColor: "bg-green-50",
              textColor: "text-green-600",
              icon: <FaUsers className="w-5 h-5" />,
            },
            {
              title: "Unique Plans",
              value: stats.uniquePlans,
              bgColor: "bg-purple-50",
              textColor: "text-purple-600",
              icon: <FaCalendarAlt className="w-5 h-5" />,
            },
          ].map((stat) => (
            <motion.div
              key={stat.title}
              className="bg-white rounded-lg p-6 border border-gray-100 text-center"
              whileHover={{ y: -3 }}
            >
              <div className="flex flex-col items-center justify-center">
                <div className={`p-3 ${stat.bgColor} rounded-lg mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          className="bg-white rounded-lg border border-gray-100 overflow-hidden"
          {...fadeIn}
        >
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Name",
                    "Phone",
                    "Persons",
                    "Date",
                    "Plan",
                    "Booked On",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-xs font-medium text-gray-600 uppercase"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">
                      {booking.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {booking.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {booking.persons}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {new Date(booking.preferableDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 text-xs font-medium rounded-full text-green-800">
                        {booking.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
