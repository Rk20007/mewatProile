import clientPromise from "@/libs/mongoClient";

export async function POST(request) {
  const { email } = await request.json();
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");

  const user = await users.findOne({ email });
  const isPaid = user?.isPaid || false;
  return new Response(JSON.stringify({ isPaid }), { status: 200 });
}
