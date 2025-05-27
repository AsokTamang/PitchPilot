import SearchForm from "../../components/searchForm"

import SearchServerp from "@/components/serverparams"
export default function Home(){
 
  return(
    <>
    <section className="w-full bg-gradient-to-br from-[#f0f4f8] via-[#d9e2ec] to-[#bcccdc] text-black flex justify-center items-center flex-col py-10 px-6">
     <h1 className="heading rounded-4xl">
    Pitch your startups here , <br/>
    Connect with entrepreneurs
    </h1>
    <p className="font-medium text-[20px] text-black max-w-2xl text-center break-words">
      Submit Ideas, Vote on peaches.
    </p>
     <SearchForm/>
    </section>
    <SearchServerp/>
   
   
    </>
  )
}