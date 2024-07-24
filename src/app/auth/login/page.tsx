import LoginForm from "@/components/auth/loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="bg-white h-screen flex items-center justify-center">
      <div className="w-[600px]">
        <LoginForm />;
      </div>
    </section>
  );
}
