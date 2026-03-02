"use client";
import { useState } from "react";

export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/change-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail }),
    });

    const data = await res.json();
    alert(data.success ? "Đổi email thành công" : data.error);
  };

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">📧 Đổi email</h1>

      <div className="max-w-md space-y-4">
        <input
  type="email"
  placeholder="Email mới"
  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
/>

        <button
          onClick={handleSubmit}
          className="bg-green-600 px-5 py-2 rounded-lg"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
}