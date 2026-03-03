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
      alert("Gửi thất bại, vui lòng thử lại.");
    }
  } catch (error) {
    alert("Có lỗi xảy ra.");
  }
};
if (success) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white p-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-400">
          Yêu cầu của bạn đã được gửi thành công !
        </h1>

        <p>
          Chúng tôi sẽ kiểm tra và phản hồi cho bạn trong thời gian sớm nhất.
        </p>

        <p>
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi !
        </p>

        <p className="text-green-300 font-semibold">
          Chúc bạn một ngày tốt lành !
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Trợ giúp</h1>
          <p className="text-gray-400">
            Gửi yêu cầu hỗ trợ, chúng tôi sẽ phản hồi sớm nhất có thể
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
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập họ và tên"
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
              placeholder="Nhập email"
            />
          </div>

          {/* Nội dung */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Nội dung
            </label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập nội dung cần hỗ trợ..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-3 font-semibold"
          >
            Gửi yêu cầu
          </button>
        </form>

        {/* Support Email */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          Hoặc liên hệ trực tiếp qua email:{" "}
          <span className="text-green-400 font-medium">
            support@yourapp.com
          </span>
        </div>
      </div>
    </div>
  );
}