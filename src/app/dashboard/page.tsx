"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface User {
  phone: string;
  name?: { first: string; last: string };
  email?: string;
  picture?: { large: string };
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Welcome, {user.name?.first || user.phone}!
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          {user.email || `Your phone: ${user.phone}`}
        </p>

        <div className="bg-gray-50 w-full p-4 rounded-xl shadow-inner mb-6">
          <p className="text-gray-700 mb-1">Name: {user.name?.first || "-"}</p>
          <p className="text-gray-700 mb-1">Email: {user.email || "-"}</p>
          <p className="text-gray-700">Phone: {user.phone}</p>
        </div>

        {/* Logout */}
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
