import {z} from 'zod';
 
export const formSchema=z.object({
    title:z.string().min(5).max(100),
    description:z.string().min(10).max(1000),
    category:z.string().min(10).max(200),
    image:z.string().url().refine(async(url)=>{
        try{
            const res=await fetch(url,{method:'HEAD'});   //here we are fetching the image link url by putting the method as head as we are trying to check whether the url is valid or not for image
            const contentType=res.headers.get('Content-Type');
            if (contentType?.startsWith('image/')){
                return true;
            }
            else{
                return false;
            }

        }
        catch{
            return false;
        }
    }),
    pitch:z.string().min(10)

})
