import { defineType,defineField } from "sanity";
import { UserIcon } from "lucide-react";

export const author=defineType({
    name:'author',
    title:'Author',
    type:'document',
    icon:UserIcon,   //here we are using the UserIcon provided by lucide-reat as an icon for the author
    fields:[
     
        defineField({
            name:'id',
            type:'number'
        }),
           defineField({
            name:'name',
            type:'string'
        }),
       
           defineField({
            name:'username',
            type:'string'
        }),
           defineField({
            name:'bio',
            type:'text'
        }),
           defineField({
            name:'email',
            type:'string'
        }),
         defineField({
            name:'image',
            type:'url'
        }),
        

    ],
    preview:{
        select:{
           title: 'name'}   //here this code preveiw , select  , title makes sure that the author data is represented by its name as a title in a sanity page.
    }

})