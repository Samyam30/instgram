import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { follower_email, followee_email } = await request.json();
    if (!follower_email || !followee_email) {
      return NextResponse.json(
        { message: "follower_email and followee_email are required" },
        { status: 400 }
      );
    }

    console.log({ follower_email, followee_email });

    await sql`
CREATE TABLE IF NOT EXISTS follows(
        follower_email TEXT NOT NULL,
        followee_email TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (follower_email) REFERENCES users(email),
      FOREIGN KEY (followee_email) REFERENCES users(email),
      PRIMARY KEY (follower_email,followee_email)
);

    `;

    // Insert the data into the database
    await sql`INSERT INTO follows (follower_email, followee_email) VALUES (${follower_email}, ${followee_email})`;

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
