import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
type props={
  propArray:{
    id:string
  }[]
}
export default function story({propArray}:props){
  return(
    <div className='overflow-scroll flex flex-row flex-auto'>
      {propArray.map((item)=>{
        return(
          <Dialog key={item.id}>
  <DialogTrigger asChild>
  <div className='storyCircle ' key={item.id}>{item.id}</div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

        
        )
      })}
      </div>
  )
}