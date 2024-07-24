import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { like, email, photo_id } = await request.json();
    if (!email || !like || !photo_id) {
      return NextResponse.json(
        { message: "email and image_url are required" },
        { status: 400 }
      );
    }

    console.log({ like, email, photo_id });

    // Create the photos table if it doesn't exist
    await sql`
    CREATE TABLE IF NOT EXISTS likes (
        "like" integer not null,
        email text not null,
        photo_id integer not null,
        created_at timestamp default now(),
        foreign key (email) references users(email),
        foreign key (photo_id) references photos(id),
        primary key (email, photo_id)
    );
    `;

    // Insert the data into the database
    await sql`INSERT INTO likes ("like",email,photo_id) VALUES (${like}, ${email},${photo_id})`;

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
