import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { iamge, email } = await request.json();
    if (!email || !iamge) {
      return NextResponse.json(
        { message: "email and iamge are required" },
        { status: 400 }
      );
    }

    console.log({ email, iamge });

    // Create the photos table if it doesn't exist
    await sql`
CREATE TABLE IF NOT EXISTS story (
  id SERIAL PRIMARY KEY,
  iamge TEXT NOT NULL,
  email VARCHAR(225) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (email) REFERENCES users(email)
);

    `;

    // Insert the data into the database
    await sql`INSERT INTO story (iamge, email) VALUES (${iamge}, ${email})`;

    // Return success response
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.error("Error in POST request:", e);

    // Return error response
    return NextResponse.json(
      { message: "Internal server error", error: e },
      { status: 500 }
    );
  }
}
