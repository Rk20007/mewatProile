import { connectToDB } from "@/libs/mongoClient";
import User from "@/models/User";

export async function POST(req) {
  const { email, paymentId, orderId } = await req.json();

  await connectToDB();
  await User.findOneAndUpdate({ email }, {
    isPaid: true,
    paymentId,
    orderId,
  });

  return new Response(JSON.stringify({ success: true }));
}
