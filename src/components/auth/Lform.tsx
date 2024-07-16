import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Lform(){
      function handleSubmit(){
        console.log("submitted");
      }
  return(
    <>
     <form className="border-2 border-cyan-600 border-solid h-[400px] w-10/12 p-10 m-8">
      <label className="inline-block">Enter email: </label>
     <Input type="text" placeholder="email" className="w-[200px] inline-block ml-5 border-2 border-solid border-blue-900"></Input><br></br>
       <label className="inline-block mt-7">Enter Password: </label>
       <Input type="password" placeholder="********" className="w-[200px] inline-block ml-5 border-2 border-solid border-blue-900"></Input><br></br>
      <Button className="mt-10" onClick={handleSubmit}>Submit</Button>

     </form>
    </>
  )
}