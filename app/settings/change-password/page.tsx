"use client";
import { useState } from "react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    alert(data.success ? "Đổi mật khẩu thành công" : data.error);
  };

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">🔐 Đổi mật khẩu</h1>

      <div className="max-w-md space-y-4">
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          className="w-full p-3 rounded text-black"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu mới"
          className="w-full p-3 rounded text-black"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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