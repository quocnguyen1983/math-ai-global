"use client";
import { useState } from "react";

export default function ChangePasswordPage() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleSubmit = async () => {
  const res = await fetch("/api/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Đổi mật khẩu thành công!");
  } else {
    alert(data.error);
  }
};
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">🔐 Đổi mật khẩu</h1>

      <div className="space-y-6 max-w-md">

        {/* Mật khẩu cũ */}
        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            placeholder="Mật khẩu cũ"
            value={oldPassword}
onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span
            onClick={() => setShowOld(!showOld)}
            className="absolute right-4 top-3 cursor-pointer text-gray-400"
          >
            {showOld ? "🙈" : "👁"}
          </span>
        </div>

        {/* Mật khẩu mới */}
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="Mật khẩu mới"
            value={newPassword}
onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-3 cursor-pointer text-gray-400"
          >
            {showNew ? "🙈" : "👁"}
          </span>
        </div>

        <button
  onClick={handleSubmit}
  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-medium"
>
  Cập nhật
</button>
      </div>
    </div>
  );
}