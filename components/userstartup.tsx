import { client } from "@/sanity/lib/client"
import { StartUpByAuthorRef } from "@/sanity/lib/queries"
import StartupCard from "./startup";
import { StartUpType } from "./startup";
export default async function Userstartup({id}:{id:string}){
    const datas=await client.fetch(StartUpByAuthorRef,{id});
  


    
    return(
    <>
    {datas?.length>0? datas.map((data:StartUpType)=><StartupCard key={data._id} post={data}/>):
    <p className="text-black-100 text-sm font-normal">No posts yet</p>}
    </>
    )
}