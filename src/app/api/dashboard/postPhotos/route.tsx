import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { image_url, email } = await request.json();
    if (!email || !image_url) {
      return NextResponse.json({ message: "email and image_url are required" }, { status: 400 });
    }

    console.log({ email, image_url });

    // Create the photos table if it doesn't exist
    await sql`
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  email VARCHAR(225) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (email) REFERENCES users(email)
);

    `;

    // Insert the data into the database
    await sql`INSERT INTO photos (image_url, email) VALUES (${image_url}, ${email})`;

    // Return success response
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.error("Error in POST request:", e);

    // Return error response
    return NextResponse.json({ message: "Internal server error", error: e }, { status: 500 });
  }
}

