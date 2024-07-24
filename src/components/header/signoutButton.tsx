"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      id="signOut"
      className="bg-red-500 font-bold text-white rounded-md px-4 py-2 h-[40px] mr-[20px]"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      sign out
    </button>
  );
}
