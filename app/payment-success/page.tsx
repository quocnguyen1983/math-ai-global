import { Suspense } from "react";
import PaymentContent from "./payment-content";

export default function Page() {
  return (
    <Suspense fallback={<div>Verifying payment status...</div>}>
      <PaymentContent />
    </Suspense>
  );
}