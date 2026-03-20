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
  setSuccess("🎉 Your account has been created successfully! Please log in.");

  setTimeout(() => {
    router.push("/login");
  }, 5000);
}
else {
  alert(data.message);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="bg-[#1e293b] p-8 rounded-xl shadow-lg w-96">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign up
        </h2>
{success && (
  <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
    {success}
  </div>
)}
        {/* Email */}
        <div className="mb-4">
         <label className="text-white font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full bg-[#020617] border border-green-500 px-4 py-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="text-white font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password..."
            className="w-full bg-[#020617] border border-green-500 px-4 py-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-green-500"
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
          className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold w-full mt-6"
        >
          Sign up
        </button>

        {/* Login link */}
        <p className="text-sm text-center mt-4">
          Already have an account {" "}
          <button
            onClick={() => router.push("/login")}
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold w-full mt-6"
        >
          
            Login
          </button>
        </p>

      </div>
    </div>
  );
}