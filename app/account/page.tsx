"use client";

import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  const resetDate = user.monthlyResetAt
    ? new Date(user.monthlyResetAt).toLocaleDateString()
    : "Chưa có";

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-white p-10">
      <div className="max-w-3xl mx-auto bg-gray-850 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-green-400">
          🚀 Plan details
        </h1>

        <div className="space-y-4 text-lg">
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span>Email</span>
            <span className="font-semibold">{user.email}</span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span>Current plan</span>
            <span className="font-semibold text-yellow-400 uppercase">
              {user.plan}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span>Questions used</span>
            <span>{user.questionsUsed}</span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span>Tokens used</span>
            <span>{user.tokensUsed}</span>
          </div>

          <div className="flex justify-between">
            <span>Reset date</span>
            <span>{resetDate}</span>
          </div>
        </div>

        <div className="mt-8">
          {user.plan === "free" && (
            <a
              href="/upgrade"
              className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition"
            >
              🔥 Upgrade now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}