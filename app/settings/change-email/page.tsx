"use client";

import { useState } from "react";

export default function ChangeEmailPage() {
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/change-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail }),
    });

    const data = await res.json();
    alert(data.success ? "Email changed successfully" : data.error);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-10">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        📧 Change email
      </h1>

      <div className="space-y-6 max-w-md">

        {/* Input Email */}
        <div className="relative">
          <input
            type="email"
            placeholder="New email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-medium"
        >
          Update
        </button>

      </div>
    </div>
  );
}