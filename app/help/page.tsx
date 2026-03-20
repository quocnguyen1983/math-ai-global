"use client";

import { useState } from "react";
export default function HelpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/help", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (error) {
    alert("An error occurred.");
  }
};
if (success) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-400">
          Your request has been submitted successfully!
        </h1>

        <p>
          We will review your request and get back to you as soon as possible.
        </p>

        <p>
          Thank you for trusting and using our service!
        </p>

        <p className="text-green-300 font-semibold">
          Have a great day!
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="w-full max-w-2xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Contact Support</h1>
          <p className="text-gray-400">
            Submit a support request and we will get back to you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg space-y-6"
        >
          {/* Họ và tên */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Nội dung */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your message..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-3 font-semibold"
          >
            Send message
          </button>
        </form>

        {/* Support Email */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          Or contact us directly via email:{" "}
          <span className="text-green-400 font-medium">
            servicetoan.ai@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}