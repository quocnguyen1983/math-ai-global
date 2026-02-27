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

router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="email"
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         text-gray-800 bg-white
                         focus:outline-none focus:ring-2
                         focus:ring-indigo-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         text-gray-800 bg-white
                         focus:outline-none focus:ring-2
                         focus:ring-indigo-500"
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
            className="w-full py-2 rounded-lg text-white font-semibold
                       bg-linear-to-r from-indigo-500 to-purple-600
                       hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}