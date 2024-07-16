"use client";
import { useSession } from 'next-auth/react';
import SignInButton from './signinButton';
import SignOutButton from './signoutButton';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-row justify-between w-full  bg-red-400 h-20 -mb-4">
      <div>Welcome to navbar</div>
      {session ? (
        <>
          <div className='text-sky-700'>{session.user?.name}</div>
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
