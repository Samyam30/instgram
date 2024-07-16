"use client";
import Link from 'next/link';
import Lform from './Lform';
import GooggleSignInButton from './googleSigninButton';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true);
    }
  }, [status]);

  console.log(status);
  

  return (
    <div className='mx-auto my-8 p-8 max-w-lg bg-zinc-100 rounded-sm'>
      <h2 className='text-center text-2xl text-blue-400 mb-8 font-bold'>
        Sign in
      </h2>
      <div>
        <p className='mb-4'>
          Sign in to your account or{' '}
          <Link href='/register' className='underline'>
            create a new account.
          </Link>
        </p>
        <Lform />
        <div className='text-center relative my-8 after:content-[""] after:block after:w-full after:h-[1px] after:bg-zinc-300 after:relative after:-top-3 after:z-0'>
          <span className='bg-zinc-100 px-4 relative z-10 text-zinc-400'>
            or
          </span>
        </div>
        {isAuthenticated ? (
          <p className='text-center'>You are already signed in.</p>
        ) : (
          <GooggleSignInButton />
        )}
      </div>
    </div>
  );
}
