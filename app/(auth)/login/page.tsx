"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="pt-24 flex flex-col lg:flex-row bg-white">
      {/* Left side - Dark section */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center text-white items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-dark items-center align-center">
            Koraput Adventure Zone
          </h1>
          <p className="text-gray-300 text-lg items-center align-center">
            Welcome to your adventure management portal
          </p>
        </div>
      </div>

      {/* Right side - White section with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo - only shown on mobile */}
          <div className="lg:hidden mb-8 flex justify-center">
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Login
            </h2>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="p-2 text-sm text-red-600 bg-red-50 border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-dark text-white hover:bg-gray-800 transition-colors text-sm font-medium py-4"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-gray-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-gray-900 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gray-900 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
