"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { fetchRandomUser } from "@/services/api";
import { User } from "@/types/user";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const iranPhoneRegex = /^(?:09\d{9}|\+989\d{9}|00989\d{9})$/;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!iranPhoneRegex.test(phone)) {
      setError("Please enter a valid Iranian mobile number!");
      return;
    }

    setLoading(true);

    try {
      const apiUser = await fetchRandomUser(phone);

      const user: User = {
        ...apiUser,
        phone,
      };

      console.log("user:::", user);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/white-abstract-background_23-2148817571.jpg?semt=ais_hybrid')",
      }}
    >
      <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            label="Mobile Number"
            placeholder="09xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={error}
          />

          <Button type="submit" loading={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
