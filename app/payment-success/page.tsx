"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "PAID") {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-500 mb-4">
        🎉 Thanh toán thành công!
      </h1>
      <p>Bạn đã đăng ký gói thành công.</p>
      <p>Đang chuyển về trang chính...</p>
    </div>
  );
}