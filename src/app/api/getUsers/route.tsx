import { db } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
export async function GET(request: NextRequest) {
  const client = await db.connect();
  let pets;

  try {
    pets = await client.sql`SELECT * FROM users;`;
    const path = request.nextUrl.searchParams.get("path") || "/";

    revalidatePath(path);
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ data: pets });
}
