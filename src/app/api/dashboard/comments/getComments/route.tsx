import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server.js";
export async function GET(request: NextRequest) {
  const client = await db.connect();
  let pets;

  try {
    //  const dats
    pets = await client.sql`SELECT * FROM comments;`;
    //To dynamically get the path
    const path = request.nextUrl.searchParams.get("path") || "/";

    revalidatePath(path);
    // pets=dats.rows;
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ data: pets });
}
