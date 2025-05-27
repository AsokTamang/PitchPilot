'use client'
import { Search,X } from "lucide-react";
import React from "react";
export default function SearchForm(){
    const [query,setquery]=React.useState('');
    
    const reset=()=>{
      const form=document.querySelector('.search-form') as HTMLFormElement;
      if (form) form.reset();   //here we are checking if the form exists then we are resetting the form
    }
    return(
      <>
        <form action='/'  className='search-form max-w-3xl w-full min-h-[30px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5 hover:border-gray-300 hover:bg-gray-100'>
            <input  name='query' defaultValue={query} onChange={(e)=>setquery(e.target.value)}  placeholder='text' className="border-0 hover:bg-gray-100 w-[80rem]"/>
      <div className="flex  flex-between justify-between w-full"></div>
            <div className='flex flex-row justify-end gap-2.5 w-full'>
              {query && (<button className="size-[50px] text-white rounded-full bg-black flex justify-center items-center !important" onClick={reset}>
                        <X/>              </button>)}
              <button type='submit' className="size-[50px] text-white rounded-full bg-black flex justify-center items-center !important">
                      <Search/>
              </button>
             
            </div>


        </form>
       
</>
    )
}