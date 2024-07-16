import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./form";
import Link from 'next/link';

export default async function LoginPage() {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="bg-white h-screen flex items-center justify-center">
      <div className="w-[500px] border-[1.5px] border-zinc-300 border-b-zinc-600 border-r-zinc-600 rounded-lg border-solid h-[550px]  pl-8">
        <h1 className="text-[40px] mt-16 text-center text-blue-700" >Sign Up</h1>
        <LoginForm />
        <div className='text-center relative my-8 after:content-[""] after:block after:w-full after:h-[1px] after:bg-zinc-300 after:relative after:-top-3 after:z-0 mr-4'>
          <span className='bg-zinc-100 px-4 relative z-10 text-zinc-400'>
            or
          </span>
        </div>
        <p className='mb-4 text-center'>
          {' '}
          <Link href='/auth/login' className='underline text-center'>
          Sign in to your account 
          </Link>
        </p>
      </div>
    </section>
  );
}