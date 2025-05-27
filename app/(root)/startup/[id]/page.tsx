import { client } from "@/sanity/lib/client";
import { StarupQueryBy_Id } from "@/sanity/lib/queries";
import FormatDate from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Viewpage from "@/components/view";
import { StartUpbySlug } from "@/sanity/lib/queries";
import StartupCard from "@/components/startup";
import { StartUpType } from "@/components/startup";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [data,  selection] = await Promise.all([
    client.fetch(StarupQueryBy_Id, { id }),
    client.fetch(StartUpbySlug, { slug: "editor-picks" })
  ]);
  const select=selection?.select || [];   //here if the selection exists then we put the select value into select otherwise an empty array.

  //here we are fetching the startup data using the query and passign id in the params
  const md = markdownit();
  const parsedContent = md.render(data?.pitch || ""); //here we are destructuring the select part which is an array  of the query.

  return (
    <>
      <section className="w-full bg-gradient-to-br text-center items-center from-[#f0f4f8] via-[#d9e2ec] to-[#bcccdc] text-black flex justify-center !min-h-[230px] flex-col py-10 ">
        <p className="bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri">
          {FormatDate(data?._createdAt)}
        </p>
        <h1 className="items-centeruppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5 rounded-4xl">
          {data.title}
        </h1>
        <p className="font-medium text-[20px] text-black max-w-2xl text-center break-words">
          {data.description}
        </p>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <img
          src={data.image}
          alt="thumbnail"
          className="w-full h-[40rem] rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className=" flex flex-row justify-between gap-10">
            <Link
              href={`/user/${data.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={data.author?.image}
                alt="authorImage"
                height={64}
                width={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="font-medium text-[20px] text-black">
                  {data.author?.name}
                </p>
                <p className="font-medium text-[16px] text-black !text-black-300">
                  @{data.author?.username}
                </p>
              </div>
            </Link>
            <p className="font-medium text-[16px] bg-gray-300 px-4 py-2  rounded-3xl">
              {data.category}
            </p>
          </div>

          <h3 className="text-[30px] font-bold text-black">Pitch Details</h3>
          <div>
            {parsedContent ? (
              <div
                dangerouslySetInnerHTML={{ __html: parsedContent }}
                className="prose max-w-4xl font-sans"
              />
            ) : (
              <p className="text-black-100 text-sm font-normal">
                No results found
              </p>
            )}
          </div>
        </div>
        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        {select?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="font-semibold text-[30px] text-black">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {select.map((post: StartUpType, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense
          fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
        >
          <Viewpage id={id} />
        </Suspense>
      </section>
    </>
  );
}
