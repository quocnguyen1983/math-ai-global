"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const plan = searchParams.get("plan");

  useEffect(() => {
    if (status === "PAID") {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [status, router]);

  if (status === "PAID") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          🎉 Thanh toán thành công!
        </h1>
        <p>
          Bạn đã đăng ký gói thành công!
        </p>
        <p>Đang chuyển về trang chính...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      Đang kiểm tra trạng thái thanh toán...
    </div>
  );
}