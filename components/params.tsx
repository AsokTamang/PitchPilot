"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import StartupCard from "./startup";
import { StartUpType } from "./startup";


export default function Searchp({initialPost}:{initialPost:StartUpType[]}) {
  const searchParam = useSearchParams();
  const query = searchParam.get("query");
  //now we are tryin to filter the initialPost by referencing to the query,
  const filteredData=query?  initialPost?.filter((post)=>post.title?.toLowerCase().includes(query?.toLowerCase())||post.category?.toLowerCase().includes(query?.toLowerCase())||post.author?.name?.toLowerCase().includes(query?.toLowerCase())):initialPost;

 

  return (
    <>
    <section className="px-6 py-10 max-w-7xl mx-auto text-black">
      <p className="text-3xl">
        {" "}
        {query ? `Search results for ${query}` : "All startups"}
      </p>
      <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">   {/* this one is a grid layout*/}
        {filteredData?.length > 0 ? (
          filteredData.map((post) => (
            <StartupCard key={post._id} post={post} />
          ))
        ) : (
          <p className="text-black-100 text-sm font-normal">
            No startups found
          </p>
        )}
      </ul>
    </section>

    </>
  );
}
