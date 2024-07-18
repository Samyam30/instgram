import SignOutButton from "./signoutButton";

export default function header(){
  return (
    <div className="w-screen h-[120px] bg-green-400 flex flex-row justify-between -mt-8">
      this is header
      <SignOutButton />
    </div>
  )
}