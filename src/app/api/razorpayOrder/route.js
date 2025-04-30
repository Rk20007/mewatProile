import Razorpay from "razorpay";

export async function POST() {
  const razorpay = new Razorpay({
    key_id: "rzp_test_QL3Va6xfWIsFm7",
    key_secret: "luPJ9AyR73N2GL2HRajZi4hv",
  });

  const options = {
    amount: 99900, // ₹999 in paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Order creation failed" }), { status: 500 });
  }
}
