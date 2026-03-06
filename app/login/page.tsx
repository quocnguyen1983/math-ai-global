"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

if (!email || !password) {
  setError("Vui lòng nhập đầy đủ thông tin!");
  return;
}

setError("");

const res = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

const data = await res.json();

if (!res.ok) {
  setError(data.message);
  return;
}

router.push("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="bg-[#1e293b] pt-6 pb-12 px-10 rounded-xl shadow-lg w-105 mx-auto flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* USERNAME */}
          <div>
            <label className="text-white font-medium">
              Username
            </label>
            <input
              type="email"
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#020617] border border-green-500 px-4 py-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-white font-medium">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020617] border border-green-500 px-4 py-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-green-500"
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

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold w-1/2 mt-6 mx-auto block"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}