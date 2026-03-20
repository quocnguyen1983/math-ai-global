"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const plans = [
  {
    name: "Free",
    price: "USD 0",
    amount: 0,
    questions: "5 questions per month",
    tokens: "12,500 tokens",
    model: "GPT-3.5",
    highlight: false,
  },
  {
    name: "Standard",
    price: "USD 4",
    amount: 4,
    questions: "500 questions per month",
    tokens: "500,000 tokens",
    model: "GPT-3.5 Turbo",
    highlight: false,
  },
  {
    name: "Pro",
    price: "USD 12",
    amount: 12,
    questions: "2000 questions per month",
    tokens: "2,000,000 tokens",
    model: "GPT-4",
    highlight: true,
  },
  {
    name: "Premium",
    price: "USD 24",
    amount: 24,
    questions: "Ask unlimited questions",
    tokens: "10,000,000 tokens",
    model: "GPT-4 Turbo",
    highlight: false,
  },
];

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Choose the perfect plan for you
      </h1>

      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 border ${
              plan.highlight
                ? "border-green-500 bg-gray-800 scale-105 shadow-xl"
                : "border-gray-700 bg-gray-900"
            }`}
          >
            {plan.highlight && (
              <div className="mb-4 text-green-400 font-semibold text-sm">
                ⭐ Most popular
              </div>
            )}

            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>

            <p className="text-3xl font-bold mb-6">{plan.price}</p>

            <ul className="space-y-3 text-gray-300 mb-8">
              <li>• {plan.questions}</li>
              <li>• {plan.tokens}</li>
              <li>• Model: {plan.model}</li>
            </ul>

            <button
  onClick={() => {
    if (plan.amount === 0) {
      alert("The Free plan is the default and requires no payment.");
      return;
    }
    setSelectedPlan(plan.name);
  }}
  className={`w-full py-2 rounded-lg font-semibold ${
    plan.highlight
      ? "bg-green-600 hover:bg-green-700"
      : "bg-gray-700 hover:bg-gray-600"
  }`}
>
  Select plan
</button>
{selectedPlan === plan.name && plan.amount > 0 && (
  <div className="mt-4">
    <PayPalScriptProvider
  options={{
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    locale: "en_US",
    disableFunding: "card", // 👈 QUAN TRỌNG
  }}
>
      <PayPalButtons
        createOrder={async () => {
  const res = await fetch("/api/paypal/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan: plan.name,
      amount: plan.amount,
    }),
  });

  const data = await res.json();
  return data.id;
}}
        onApprove={async (data) => {
          await fetch("/api/paypal/capture-order", {
            method: "POST",
            body: JSON.stringify({
              orderID: data.orderID,
              plan: plan.name,
            }),
          });

          window.location.href = "/payment-success?success=true";
        }}
      />
    </PayPalScriptProvider>
  </div>
)}
          </div>
        ))}
      </div>
    </div>
  );
}