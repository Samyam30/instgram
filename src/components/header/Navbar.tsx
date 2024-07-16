"use client";
import { useSession, signIn } from 'next-auth/react';
import SignInButton from './signinButton';
import SignOutButton from './signoutButton';
import { Button } from '../ui/button';
import Link from 'next/link';
import Story from '../dialogue/story';
import { number } from 'zod';
export default function Navbar() {
  const { data: session, status } = useSession();
  type prop={
    array:{
      id:number,
    }[]
  }
  const data=[{
    id:'1'
  },{
    id:'2'
  },{
    id:'3'
  },{
    id:'4'
  },{
    id:'5'
  },{
    id:'6'
  },{
    id:'7'
  },{
    id:'8'
  },{
    id:'9'
  },{
    id:'10'
  },{
    id:'11'
  },{
    id:'12'
  },{
    id:'13'
  }]

  return (
    <div className="flex flex-row w-auto  bg-red-400 h-[100px]  ">
      <Story propArray={data}/>
      {session ? (
        <>
          <div className='text-sky-700'>{session.user?.name}</div>
          {/* <SignOutButton /> */}
        </>
      ) : (
        <Button ><Link href="/auth/login">signIn</Link> </Button>
      )}
    </div>
  );
}
