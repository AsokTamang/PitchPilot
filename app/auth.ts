
import { client } from "@/sanity/lib/client"
import { writeClient } from "@/sanity/lib/write-client"
import { AuthorById } from "@/sanity/lib/queries"
import NextAuth from "next-auth"
import GitHub  from "next-auth/providers/github"
 
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({ user, account, profile }) {
  console.log("SIGNIN CALLBACK TRIGGERED")
  console.log("GitHub profile.id:", profile?.id)

  const sanityId =profile?.id // or just use `${profile?.id}` depending on your GROQ query

  try {
    const existing = await client.withConfig({ useCdn: false }).fetch(   //here we are fetching the author data by using the profile id from github.
      AuthorById,
      { id: sanityId }
    )
    console.log("Author exists?", existing)

    if (existing.length<1) {
      const created = await writeClient.create({            
        _id:`author.${profile?.id}`,
        id:profile?.id,

        _type: 'author',
        name: user?.name,
        email: user?.email,
        username: profile?.login,   
        bio: profile?.bio || "",
        image: user?.image,
      })
      console.log("Created new author:", JSON.stringify(created))
    }

    return true;
  } catch (error) {
    console.error("Error in signIn callback:", error)
    return false // prevents login
  }
}
,
    async jwt({token,account,profile}) {   //then we are passing the author id to the token id for that logged in user.
      const sanityId =profile?.id // or just use `${profile?.id}` depending on your GROQ query

      if(account && profile){
        const author=await client.withConfig({useCdn:false}).fetch(AuthorById,{id:sanityId});    //here we are checking if the profile and account exists in github then we are assigning the id of token with the author data which is linked with the profile of github
        if(author){
        token.id=author?._id;}  //we are passing the unique id of loggedin user to the token
        else{
          console.warn('No author detected')
        }
      };
      
      return token;
    
      

    

      
   

      
    },
    async session({token,session}) {
     if(token.id){
     Object.assign(session,{id:token.id})  }  //here we are assigning the session's id with the linked token's id.
     else{
      console.warn('Token id not found.')
     }

    
    
     return session;  //then we return the new session
      
    }

  }

  
})