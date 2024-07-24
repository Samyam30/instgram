export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <div className="h-20 w-full bg-amber-400 border-b-black">This is navbar</div> */}
      <div>{children}</div>
    </div>
  );
}
