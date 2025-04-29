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
  

  const initiatePayment = async (userEmail) => {
    const isLoaded = await loadRazorpayScript();
  
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK, please try again.");
      return;
    }
  
    try {
      const res = await fetch('/api/razorpayOrder', {
        method: 'POST',
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Razorpay Order API error:", errorText);
        alert("Something went wrong while creating Razorpay order.");
        return;
      }
  
      const { order } = await res.json();
  
      const options = {
        key: "rzp_test_wlc06McHQ6sCnZ",
        amount: order.amount,
        currency: order.currency,
        name: "Your Company",
        description: "₹999 Plan",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment successful:", response);
  
          await fetch('/api/markPaid', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
          });
  
          setPaymentDone(true); // Now correctly used as boolean
          signIn('google', { callbackUrl: '/account' });
        },
        prefill: {
          email: userEmail, // correct use of dynamic email
        },
        theme: {
          color: "#3399cc",
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("initiatePayment error:", err);
      alert("Payment initiation failed. Please try again.");
    }
  };
  
  

  const handleSignIn = async () => {
    const res = await fetch('/api/checkPaid', {
      method: 'GET',
    });

    const { isPaid } = await res.json();
    console.log("isPaid",isPaid);
    

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
