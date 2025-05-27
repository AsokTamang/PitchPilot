import { auth } from "@/app/auth"
import { redirect } from "next/navigation";
import Startupform from "@/components/startupform";

export default  async function Create(){
    const session=await auth();
    if(!session) redirect('/');    //here we are checking if the user is not authenticated then we redirect the user  directly to home page.
    return(
        <>
        <section className="w-full bg-gradient-to-br text-center items-center from-[#f0f4f8] via-[#d9e2ec] to-[#bcccdc] text-black flex justify-center !min-h-[230px] flex-col py-10 ">
           <h1 className="items-centeruppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5 rounded-4xl">
             Submit Your Startup
        </h1>
       
        </section>
         <Startupform/>
         </>
    )
}