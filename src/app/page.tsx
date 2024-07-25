"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  function handlelog() {
    console.log("clicked");
    router.push("/auth/login");
  }
  console.log("hello");
  return (
    <div>
      <h1 className="rooth">Welcome to Instagram Clone</h1>
      <Button
        variant="outline"
        size="lg"
        className="rootButton bg-neutral-950 text-red-600 text-3xl align-middle content-center"
        onClick={handlelog}
      >
        LOGIN
      </Button>
    </div>
  );
}
