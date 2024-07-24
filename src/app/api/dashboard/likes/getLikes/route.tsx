import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await db.connect();
  let pets;

  try {
    //  const dats
    pets = await client.sql`SELECT * FROM likes;`;
    // pets=dats.rows;
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ data: pets });
}
