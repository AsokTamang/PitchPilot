import { client } from "@/sanity/lib/client"
import { startupQueries } from "@/sanity/lib/queries"
import StartupCard from "./startup";
import { StartUpType } from "./startup";
export default async function Allstartup(){
    const datas=await client.fetch(startupQueries);  //here we are fetching all the startups
  


    
    return(
    <>
    {datas?.length>0? datas.map((data:StartUpType)=><StartupCard key={data._id} post={data}/>):
    <p className="text-black-100 text-sm font-normal">No startups available</p>}
    </>
    )
}