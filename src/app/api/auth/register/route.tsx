import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log({ email, password });

    // Create the users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email varchar(225) NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Insert the user into the database
    await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;

    // Return success response
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.error("Error in POST request:", e);

    // Return error response
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
