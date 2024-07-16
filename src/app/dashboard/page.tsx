import Navbar from "@/components/header/Navbar";
import PostDisp from "@/components/dialogue/postDisp" 
import ProfileIcon from "@/components/dialogue/profileIcon";
export default function dashboard(){
  const data=[{id:'1'},{id:'2'}]
  return(
    <div className=" h-auto flex flex-row justify-between -mt-4 ">
      <div className="left bg-white h-auto flex flex-column justify-between  border-r-solid border-r-[1.5px] border-r-stone-500">

      </div>
      <div className="middle h-full  border-r-solid border-r-[1.5px] border-r-stone-500">
        <Navbar />
        <PostDisp arrayProp={data}/>
      </div>
      <div className="right h-auto flex flex-column justify-between">
        < ProfileIcon />
      </div>
    </div>
  )
}