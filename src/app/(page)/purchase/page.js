'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PurchasePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      checkPayment();
    }
  }, [status]);

  const checkPayment = async () => {
    const res = await fetch("/api/checkPaid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email }),
    });
    const data = await res.json();

    if (data.isPaid) {
      router.push("/account");
    } else {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) return alert("Razorpay SDK failed to load.");

    const res = await fetch("/api/razorpayOrder", { method: "POST" });
    const { order } = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your Company",
      description: "₹999 Plan",
      order_id: order.id,
      handler: async function (response) {
        await fetch("/api/markPaid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email }),
        });
        router.push("/account");
      },
      prefill: {
        email: session.user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (status === "loading" || loading) {
    return <div className="text-center p-10">Checking payment status...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Complete Your Purchase</h2>
      <p className="mb-6">Access to the platform requires a ₹999 one-time payment.</p>
      <button
        onClick={initiatePayment}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
        Pay ₹999 with Razorpay
      </button>
    </div>
  );
}
