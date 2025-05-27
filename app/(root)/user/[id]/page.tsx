import { client } from "@/sanity/lib/client";
import { AuthorQueryBy_Id } from "@/sanity/lib/queries";
import Image from "next/image";
import { auth } from "@/app/auth";
import Userstartup from "@/components/userstartup";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import Allstartup from "@/components/allstartups";


export default async function Userdetail({
  params,
}: {
  params: { id: string };
}) {
    const session=await auth();
  const { id } = params; //here we are destructuring the id from params
  const data = await client.fetch(AuthorQueryBy_Id, { id }); //here we are passing the authorbyid query and the id passed into url as params to get that specific author data
  if (!data) return notFound();
  return (
    <div>
      <section className="w-full pb-10 pt-20 px-6 max-w-7xl mx-auto lg:flex-col flex-col flex gap-10 justify-center items-center">
        <div className=" w-80 px-6 pb-6 pt-20 flex flex-col justify-center bg-gradient-to-br text-center items-center from-[#f0f4f8] via-[#d9e2ec] to-[#bcccdc] border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full">
           <div className="w-11/12 bg-white border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 before:left-0  before:-skew-y-6 before:w-full before:h-[60px] before:bg-black  before:-z-[1] before:rounded-[20px] shadow-100">
            <h3 className="text-24-black uppercase text-center">{data.name}</h3>
           </div>
          <Image
            src={data.image}
            alt={data.name}
            width={220}
            height={220}
            className="rounded-full object-cover border-[3px] border-black"
          />
          <p className="text-[30px] font-extrabold text-black mt-7 text-center ">
            @{data.username}
          </p>
          <p className="mt-1 font-normal text-sm text-black-100/80 text-center">{data.bio}</p>
        </div>
        <div className="flex-1 flex-col gap-5 lg:-mt-5">
            <p className="text-[30px] font-extrabold text-black">
             {session?.id===id?"Your":"All"} Startups   {/**here we are checking the id of the signed in user is equal to the id of the author which is clicked or whose page is visited  at the moment */}
            </p>
            <ul className="grid sm:grid-cols-2 gap-5;">
            <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />
}>
            {session?.id===id?
            <Userstartup id={id}/>: <Allstartup/>}
            </Suspense>

            </ul>

        </div>

      </section>
    </div>
  );
}
