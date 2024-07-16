"use client";
import { useSession, signIn } from 'next-auth/react';
import SignInButton from './signinButton';
import SignOutButton from './signoutButton';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-row justify-between w-full  bg-red-400 h-20 -mb-4 -mt-4 mb-5">
      <div>Welcome to navbar</div>
      {session ? (
        <>
          <div className='text-sky-700'>{session.user?.name}</div>
          <SignOutButton />
        </>
      ) : (
        <Button ><Link href="/auth/login">signIn</Link> </Button>
      )}
    </div>
  );
}
