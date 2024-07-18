"use client"
import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import PostComment from '../comment/postComment';
import ShowComments from '../comment/showComment'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Like from "../Like/like";
interface props{
  arrayProp:{
    id:string,
    image_url:string,
    email:string,
    created_at:string
  }[]
}
const CarouselDApiDemo:React.FC<props>=({arrayProp})=> {

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])



  return (
    <div className="posts">
      {arrayProp.map((item)=>{
        return(
          <>
            <Carousel setApi={setApi} key={item.id} className="w-full max-w-xs border-2 border-solid border-red-950 mt-10">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex flex-col items-center p-6 border-2 border-solid border-red-400">
                  <img src={item.image_url} className="w-[200px] h-[150px] flex-2"></img>
                  <span className="text-sm font-semibold flex-1">id is {item.id}</span>
                  <span className="text-xs flex-1">email is {item.email}</span>
                  <span className="text-xs flex-1">Uploaded at {item.created_at}</span>
                </CardContent>
              </Card>
              <div>Like, Comment</div>
              < Like email={item.email} photo_id={item.id}/>
              <div className="flex flex-col gap-3 ">
                < PostComment email={item.email} photo_id={item.id}/>
                < ShowComments photo_id={item.id}/>
              </div>
            </CarouselItem>
          ))}
          <div>hello</div>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
          </>
        )
      })}
      
    </div>
  )
}
export default CarouselDApiDemo;