// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import clientPromise from "@/libs/mongoClient";

// export async function POST() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return new Response(JSON.stringify({ isPaid: false }), { status: 200 });
//   }

//   const client = await clientPromise;
//   const db = client.db();
//   const users = db.collection("users");

//   const user = await users.findOne({ email: session.user.email });

//   return new Response(JSON.stringify({ isPaid: user?.isPaid ?? false }), { status: 200 });
// }


export async function POST() {
    return new Response(JSON.stringify({ isPaid: false }), { status: 200 });
  }
  
  