import { EyeIcon } from "lucide-react";
import FormatDate from "../lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Startup,Author } from "@/sanity/types";   //here we are importing the types from sanity generated types file

export type StartUpType=Omit<Startup,'author'> & {'author'?:Author};  //here in this code we are delcaring the type called StartUpType which removes a key or field named author from type Startup and if the key or field author exists then it is of type Author.


export default function StartupCard({ post }: { post: StartUpType }) {
  const {
    _id,
    _createdAt,
    views,
    author,
    description,
    image,
    category,
    title,
  } = post; //here we are destructuring the keys from our post
  return (
    <li className="bg-white border-[5px] text-black border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-gray-300 transition-all duration-500 hover:shadow-300 hover:bg-gray-100 groupd">
      <div className="flex  flex-between justify-between w-full">
        <p className="font-medium text-[16px] text-black bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100">
          {FormatDate(_createdAt)}
        </p>
        <div className="flex justify-end gap-1.5">
          <EyeIcon className="size-6" />
          <span className="text-2xl">{views}</span>
        </div>
      </div>

      <div className="flex flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-2xl line-clamp-1">{author?.name}</p>
            {/* here this code line-clamp-1 enables the text to stay within the same line*/}
          </Link>
          <Link href={`/startup/${_id}`}>
            <p className="text-3xl  line-clamp-1">{title} </p>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image||''}   //here we either giving the immage link if the image exists if it doesnot exist then we are just giving an empty url
            width={48}
            height={48}
            className="rounded-full"
            alt="userProfile"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all">
          {description}
        </p>
        <img src={image} alt="startupimage" className="w-full h-[164px] rounded-[10px] object-cover"  />
      </Link>
     
      <div className="flex flex-between justify-between w-full gap-[8rem] mt-4">
        <Link href={`?query=${category?.toLowerCase()}`}>   {/*Here we are declaring the link to category*/}  {/**same with the category */}
        <p className="text-2xl">{category}</p>
        </Link>
        <Button>
             <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}
