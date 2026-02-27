"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
const [showPassword, setShowPassword] = useState(false);
  const handleRegister = async () => {
    const res = await fetch("/api/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});

const data = await res.json();

if (res.ok) {
  setSuccess("🎉 Tài khoản của bạn đã được tạo thành công! Vui lòng đăng nhập.");

  setTimeout(() => {
    router.push("/login");
  }, 5000);
}
else {
  alert(data.message);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Đăng ký
        </h2>
{success && (
  <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
    {success}
  </div>
)}
        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium  text-gray-700 mb-">
            Email
          </label>
          <input
            type="email"
            placeholder="Nhập email..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block mb-2 text-sm font-medium text-gray-700 mb-">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Show / Hide Icon */}
<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-4 top-11 text-gray-500 hover:text-purple-600"
>
  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
</button>
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Đăng ký
        </button>

        {/* Login link */}
        <p className="text-sm text-center mt-4">
          Đã có tài khoản?{" "}
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          
            Đăng nhập
          </button>
        </p>

      </div>
    </div>
  );
}