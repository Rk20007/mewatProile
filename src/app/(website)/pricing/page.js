"use client"
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "TopProfile | Pricing",
//   description:
//     "Share your links, social profiles, contact info and more on one page",
// };

export default function Pricing() {
  const tiers = [
    {
      name: "Premium",
      id: "tier-premium",
      href: "/checkout",
      priceMonthly: "$24",
      description: "The VIP support plan for businesses ready to monetize and sell on a larger scale.",
      buttonText: "Get Premium",
      mostPopular: false,
    },
    {
      name: "Pro",
      id: "tier-pro",
      href: "/checkout",
      priceMonthly: "$9",
      description: "Grow, learn about and own your following forever with a branded Linktree.",
      buttonText: "Get Pro",
      recommended: true,
    },
    {
      name: "Starter",
      id: "tier-starter",
      href: "/checkout",
      priceMonthly: "$5",
      description: "More customization and control for creators ready to drive more traffic to and through their Linktree.",
      buttonText: "Get Starter",
      mostPopular: false,
    },
    {
      name: "Free",
      id: "tier-free",
      href: "/checkout",
      priceMonthly: "$0",
      description: "Unlimited links and a customizable Linktree to connect your community to everything you are.",
      buttonText: "Join for free",
      mostPopular: false,
    },
  ];
  
    const router = useRouter();
  
    const handleCheckout = (tier) => {
      router.push(`/checkout?name=${tier.name}&price=${tier.priceMonthly}`);
    };
  return (
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-3xl p-8 shadow-md ${tier.recommended ? "ring-2 ring-gray-900" : "ring-1 ring-gray-200"}`}
          >
            <div className="bg-black text-white p-4 rounded-t-3xl">
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-2 text-3xl font-bold">{tier.priceMonthly} <span className="text-sm">USD/month</span></p>
            </div>
            <div className="p-6 bg-white rounded-b-3xl">
              <p className="text-sm text-gray-600">{tier.description}</p>
              <button
                onClick={() => handleCheckout(tier)}
                className={`mt-6 w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm border ${tier.recommended ? "bg-black text-white" : "bg-white text-black border-gray-900 hover:bg-gray-100"}`}
              >
                {tier.buttonText}
              </button>
              {tier.recommended && (
                <p className="mt-2 text-xs text-gray-500 flex justify-center">Pro users get more visitors</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
