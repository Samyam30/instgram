import SignOutButton from "../header/SignoutButton";

export default function Header() {
  return (
    <div
      className="w-full h-[120px]  flex flex-row justify-between -mt-8 pt-12 pl-4 mb-10 items-end
    "
    >
      <SignOutButton />
    </div>
  );
}
