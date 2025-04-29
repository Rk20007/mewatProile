import clientPromise from "@/libs/mongoClient";

export async function POST(req) {
  const { email } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    await users.updateOne(
      { email },
      { $set: { isPaid: true } }
    );

    return new Response("User marked as Paid", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
