'use client';

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginWithGoogle() {
  const [paymentDone, setPaymentDone] = useState(false);


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
  
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK, please try again.");
      return;
    }
  
    const res = await fetch('/api/razorpayOrder', {
      method: 'POST',
    });
    const { order } = await res.json();
  
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your Company",
      description: "₹999 Plan",
      order_id: order.id,
      handler: async function (response) {
        // ✅ Payment Success
        console.log(response);
  
        await fetch('/api/markPaid', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: paymentDone }) // email idhar actual dalni chahiye
        });
  
        setPaymentDone(true);
        signIn('google', { callbackUrl: '/account' });
      },
      prefill: {
        email: paymentDone, // (yaha dynamically user email bharwana better rahega)
      },
      theme: {
        color: "#3399cc"
      }
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  const handleSignIn = async () => {
    const res = await fetch('/api/checkPaid', {
      method: 'POST',
    });

    const { isPaid } = await res.json();

    if (isPaid) {
      // ✅ Already Paid, direct login
      signIn('google', { callbackUrl: '/account' });
    } else {
      // ❌ Payment required
      initiatePayment();
    }
  };

  return (
    <div className="max-w-sm mx-auto p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome Back!</h2>
      <p className="text-gray-500 text-center mb-8">Sign in with Google after payment</p>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 text-white text-lg w-full py-3 flex gap-3 items-center justify-center rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-md hover:scale-105">
        <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 animate-pulse" />
        <span className="font-medium">Sign in with Google</span>
      </button>
    </div>
  );
}
