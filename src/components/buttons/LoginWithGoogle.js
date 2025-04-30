'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto p-8 bg-white rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome Back!</h2>
      <p className="text-gray-500 text-center mb-8">Sign in with Google to continue</p>
      <button
        onClick={() => signIn('google', { callbackUrl: '/purchase' })}
        className="bg-blue-500 text-white text-lg w-full py-3 rounded-xl hover:bg-blue-600 transition-all duration-300">
        Sign in with Google
      </button>
    </div>
  );
}
