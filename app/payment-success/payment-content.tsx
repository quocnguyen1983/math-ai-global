"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const plan = searchParams.get("plan");

  useEffect(() => {
    if (success === "true") {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [success, router]);

  if (success === "true") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          🎉 Payment successful!
        </h1>
        <p>
          Your subscription was successful!
        </p>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      Verifying payment status...
    </div>
  );
}