import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export async function POST() {
  const payment_capture = 1;
  const amount = 999 * 100; // ₹999

  const options = {
    amount: amount,
    currency: "INR",
    payment_capture,
  };

  const order = await razorpay.orders.create(options);

  return Response.json({ order });
}
