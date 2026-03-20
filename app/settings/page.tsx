"use client";
import Link from "next/link";
import { useEffect } from "react";
export default function SettingsPage() {
 
  return (
    <div className="min-h-screen bg-[#020617] bg-gradient-to-br from-[#020617] via-[#020617] to-[#0a2540] text-white">
      
      <div className="max-w-3xl mx-auto pt-16">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">
            Manage your account and customize your settings
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">

          {/* Change Password */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">🔐 Change password</h2>
                <p className="text-gray-400 text-sm">
                  Update your password to keep your account secure
                </p>
              </div>

              <Link href="/settings/change-password">
  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium">
    Change
  </button>
</Link>
            </div>
          </div>

          {/* Change Email */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">📧 Change Email</h2>
                <p className="text-gray-400 text-sm">
                  Update email address
                </p>
              </div>

              <Link href="/settings/change-email">
  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium">
    Update
  </button>
</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}