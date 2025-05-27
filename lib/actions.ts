"use server"
import { auth } from "@/app/auth";
import { JsonFormatterServer } from "./utils";
import slugify from 'slugify'
import { writeClient } from "@/sanity/lib/write-client";



export async function CreatePitch(state:any,form:FormData,pitch:string){
    const session=await auth();
    if(!session){
        return JsonFormatterServer({error:'User not signed in',status:'ERROR'})
    }
    
    const {title,description,category,image}=Object.fromEntries(Array.from(form).filter(([key])=>key!=='pitch'))    //here we are converting each form fields into objects and then making their collection into an array and filtering the fields whose key isnot a pitch.
    const slug=slugify(title as string)
    try{
        const startUp={
            title,
            description,
            category,
            image,
            author:{
                _type:'reference',
                _ref:session?.id   //here we are creating the reference id of author  from the signed in user for this newly created startup
            },
            slug:{
                _type:slug,
                current:slug
            },
            pitch
        }

        const result= await writeClient.create({_type:'startup',...startUp})   //here we are creating the database of type startup 
        return JsonFormatterServer({...result,error:' ',status:'SUCCESS'})

    }
    catch(Err){
        console.log(Err);
        return JsonFormatterServer({error:Err,status:'ERROR'})
    }

}