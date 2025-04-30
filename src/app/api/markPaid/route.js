import clientPromise from "@/libs/mongoClient";

export async function POST(request) {
  const { email } = await request.json();
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");

  await users.updateOne({ email }, { $set: { isPaid: true } });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
