
import PostPhotos from '@/components/dashboard/postPhotos';
import { list } from '@vercel/blob';

 
export default async function show() {
  // const [data,setData]=useState('');
  // const func=async()=>{
  const response = await list();
  console.log("h1")
  const data=response.blobs[response.blobs.length-1].url;
  console.log(data);
  console.log("samyam");
  // }
  // useEffect(()=>{
  //   func();
  // },[])
  

  return (
    <>

      < PostPhotos image={data}/>
    </>
  );
}