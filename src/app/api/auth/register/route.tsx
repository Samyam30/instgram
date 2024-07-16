// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     console.log({ email, password });
//   } catch (e) {
//     console.log({ e });
//   }

//   return NextResponse.json({ message: "success" });
// }



// import { NextResponse } from "next/server";
// import { hash } from "bcrypt";
// import { sql } from "@vercel/postgres";

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     // Optional: Add validation here
//     if (!email || !password) {
//       return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
//     }

//     console.log({ email, password });
    
//     // Hash the password
//     const hashedPassword = await hash(password, 10);

//     // Insert the user into the database
//     const response = await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;
    
//     // Log the response for debugging
//     console.log({ response });

//     // Return success response
//     return NextResponse.json({ message: "success" }, { status: 200 });
//   } catch (e) {
//     console.error(e);

//     // Return error response
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Optional: Add validation here
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    console.log({ email, password });

    // Create the users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
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
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
