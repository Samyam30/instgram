
'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl') || '/';
  return (
    <button
      className='bg-white border border-zinc-300 py-1 rounded-md w-full text-zinc-700'
      onClick={() => signIn('google', { callbackUrl:"/dashboard" })}
    >
      <div className='flex flex-row gap-[10px] ml-[80px]'>
      <div className='text-red-600 pl-16'>G</div> Sign in with Google
      </div>
    </button>
  );
}