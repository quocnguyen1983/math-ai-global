"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  const changePassword = async () => {
    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    alert(data.success ? "Đổi mật khẩu thành công" : data.error);
  };

  const changeEmail = async () => {
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
      <h1 className="text-3xl font-bold mb-8">⚙ Cài đặt</h1>

      <div className="space-y-8 max-w-xl">

        <div>
          <h2 className="font-semibold mb-2">Đổi mật khẩu</h2>
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            className="w-full p-2 rounded text-black mb-2"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full p-2 rounded text-black mb-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={changePassword}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Cập nhật
          </button>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Đổi email</h2>
          <input
            type="email"
            placeholder="Email mới"
            className="w-full p-2 rounded text-black mb-2"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button
            onClick={changeEmail}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Cập nhật
          </button>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Chế độ tối / sáng</h2>
          <button
            onClick={toggleTheme}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            {dark ? "Chuyển sang sáng" : "Chuyển sang tối"}
          </button>
        </div>

      </div>
    </div>
  );
}