import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_wlc06McHQ6sCnZ",
  key_secret: "LFuh5vpkMbn7UNQ1lQbA3ckr",
});

export async function POST(req) {
  const payment_capture = 1;
  const amount = 999 * 100;

  const options = {
    amount: amount,
    currency: "INR",
    payment_capture,
  };

  try {
    const order = await razorpay.orders.create(options);
    return Response.json({ order });
  } catch (error) {
    console.error("Razorpay Order Error:", error); // show full stack in console
    return Response.json({ error: error.message || "Order creation failed" }, { status: 500 });
  }
}
