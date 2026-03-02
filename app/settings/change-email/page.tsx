"use client";

import { useState } from "react";

export default function ChangeEmail() {
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
    alert(data.success ? "Đổi email thành công" : data.error);
  };

  return (
    <div
      className="
        min-h-screen 
        bg-white 
        dark:bg-linear-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
        text-black 
        dark:text-white
        px-6 py-12
        transition-colors duration-300
      "
    >
      <div className="max-w-xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-3xl">📧</span>
            Đổi email
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Cập nhật Email
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">

          <input
            type="email"
            placeholder="Email mới"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="
              w-full
              px-4 py-4
              rounded-xl
              bg-gray-100 dark:bg-gray-800
              border border-gray-300 dark:border-gray-600
              focus:outline-none
              focus:ring-2 focus:ring-green-500
              transition-all duration-200
            "
          />

          <button
            onClick={handleSubmit}
            className="
              bg-green-600 
              hover:bg-green-700 
              px-6 py-3 
              rounded-xl 
              font-medium
              transition-all duration-200
            "
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}