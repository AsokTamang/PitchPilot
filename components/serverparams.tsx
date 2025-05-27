
import { startupQueries } from "@/sanity/lib/queries";
import { sanityFetch,SanityLive } from "@/sanity/lib/live";
import {auth} from '../app/auth'



import Searchp from "./params";



export default async function SearchServerp() {
   
 
 
  
     const {data:data}= await sanityFetch({ query:startupQueries})       //here we are fetching the data by using the GROQ query language
  

   
  return (
    <>
    <Searchp initialPost={data}/>
    <SanityLive/>
    </>
  );
}
