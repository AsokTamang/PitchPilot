import { client } from "@/sanity/lib/client"
import Ping from "./ping"
import { startUp_viewbyID } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"
import { after } from "next/server"

export default async function Viewpage({id}:{id:string}){
    const data=await client.withConfig({useCdn:false}).fetch(startUp_viewbyID,{id})  //here we are fetching the view of startup by id
    after(async()=>await writeClient.patch(id).set({views:data.views+1}).commit());   //here we are updating(patch) the database of given id by adding one to the views of database and committing it. 
    return(
        <div className="flex justify-end items-center mt-5 fixed bottom-20 right-5">
            <div className="absolute -right-2 -top-2">
            <Ping/>
             </div>
        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize">
            <span className="font-black text-black">
               Views:{data?.views}
                 
            </span>
        </p>
       
        </div>
    )
}