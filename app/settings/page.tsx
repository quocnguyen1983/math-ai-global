"use client";
import Link from "next/link";
import { useEffect } from "react";
export default function SettingsPage() {
 
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-12">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Cài đặt</h1>
          <p className="text-gray-400">
            Quản lý tài khoản và tùy chỉnh hệ thống của bạn
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">

          {/* Change Password */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">🔐 Đổi mật khẩu</h2>
                <p className="text-gray-400 text-sm">
                  Cập nhật mật khẩu để bảo mật tài khoản
                </p>
              </div>

              <Link href="/settings/change-password">
  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium">
    Thay đổi
  </button>
</Link>
            </div>
          </div>

          {/* Change Email */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">📧 Đổi email</h2>
                <p className="text-gray-400 text-sm">
                  Cập nhật email đăng nhập của bạn
                </p>
              </div>

              <Link href="/settings/change-email">
  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium">
    Cập nhật
  </button>
</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}