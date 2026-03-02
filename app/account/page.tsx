"use client";

import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Thông tin gói cước</h1>

      <div className="space-y-3">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Gói hiện tại:</strong> {user.plan}</p>
        <p><strong>Số câu đã dùng:</strong> {user.questionsUsed}</p>
        <p><strong>Token đã dùng:</strong> {user.tokensUsed}</p>
        <p><strong>Ngày reset:</strong> {new Date(user.monthlyResetAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}