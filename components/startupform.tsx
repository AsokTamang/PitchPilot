"use client";
import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useActionState } from "react";
import { formSchema } from "@/lib/validation";
import { ZodError } from "zod";
import { CreatePitch } from "@/lib/actions";
import { useRouter } from "next/navigation";

import { toast } from "sonner";



const Startupform = () => {
  const router=useRouter();
  const [errors, seterrors] = React.useState<Record<string, string>>({}); //here <Record<string,string>> means as Record is a typescript utility and <string,string> means the key-value pair inside the state's object is of type string.
  const [pitch, setpitch] = React.useState("pitch");
  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: formData.get("image") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues); //here we are comparing the formdata values that we entered with the form schema for the validation check
      const result = await CreatePitch(prevState,formData,pitch)
      if(result.status==="SUCCESS"){
         
       toast.success("Your startup pitch is saved successfully!");
       setpitch('pitch');
       router.push(`/startup/${result._id}`)   //if all the input fields are validated and stored in a sanity datavbase correctly then we redirect the user to the startup page.

      }
     
     
   //if all the datas are entered correctly then we show a toast of successful message.
    } catch (err) {
      if (err instanceof ZodError) {    //here instance of ZodError is the function of zod that is related with providing the errors occured in zod form.
        const fielderrors = err.flatten().fieldErrors; //here flatten() method is used to convert the complex errors response provided by zod into simpler form and .fieldErros helps to return the error into fielname as key and the errors that occured as a value.
        seterrors(fielderrors as unknown as Record<string, string>); //here we are assigning the type of fielderrors as unknown at first then later with the key value of string
        toast("Please enter the data correctly!");

        return { ...prevState, error: "Validation errors", status: "ERROR" };
      } else {
        toast("Please enter the data correctly!");

        return {
          ...prevState,
          error: "Unexpected error occured",
          status: "ERROR",
        };
      }
    }
  };
  const [state, formAction, ispending] = useActionState(handleSubmit, {   //here this object is an initial state of our form
    error: "",
    status: "initial",
  }); //here we are using the handleshubmit function which will trigger after the form is submitted
  return (
    <div>
      <form action={formAction} className="flex flex-col  items-center">
        <div className="w-1/2">
          <label
            htmlFor="title"
            className="font-bold text-[18px] text-black uppercase"
          >
            Title
          </label>
          <Input
            name="title"
            id="title"
            placeholder="Startup title"
            className=" border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important w-full"
            required
          />
          {errors.title && (
            <p className="text-red-500 mt-2 ml-5">{errors.title}</p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="description"
            className="font-bold text-[18px] text-black uppercase"
          >
            Description
          </label>
          <Textarea
            name="description"
            id="description"
            placeholder="Start-up Description"
            className="  border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300 !important"
            required
          />
          {errors.description && (
            <p className="text-red-500 mt-2 ml-5">{errors.description}</p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="category"
            className="font-bold text-[18px] text-black uppercase"
          >
            Category
          </label>
          <Input
            name="category"
            id="category"
            placeholder="Start-up Category"
            className=" border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important"
            required
          />
          {errors.category && (
            <p className="text-red-500 mt-2 ml-5">{errors.category}</p>
          )}
        </div>

        <div className="w-1/2">
          <label
            htmlFor="image"
            className="font-bold text-[18px] text-black uppercase"
          >
            Image URL
          </label>
          <Input
            name="image"
            id="image"
            placeholder="Start-up Image"
            className=" border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important"
            required
          />
          {errors.image && (
            <p className="text-red-500 mt-2 ml-5">{errors.image}</p>
          )}
        </div>

        <div data-color-mode="light" className="w-1/2">
          <label
            htmlFor="pitch"
            className="font-bold text-[18px] text-black uppercase"
          >
            Pitch
          </label>
          <MDEditor
            value={pitch}
            onChange={(value) => setpitch(value as string)}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{    //here textareaProps means the textarea property inside the mdeditor
              placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            height={300}
          />
          {errors.pitch && (
            <p className="text-red-500 mt-2 ml-5">{errors.pitch}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={ispending}  //and we are disbling the button if our form is in pending state
          className="w-1/3 hover:border-black text-black  bg-gradient-to-r from-[#f0f4f8] via-[#d9e2ec] to-[#bcccdc] border-[4px] rounded-full p-5 min-h-[70px]  font-bold text-[18px] mt-4 !important"
        >
          {ispending ? "submitting....." : "submit your pitch"}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default Startupform;
