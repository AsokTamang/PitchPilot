import { defineQuery } from "next-sanity";

export const startupQueries = defineQuery(
  //here we are using the defineQuery imported from next-sanity and using the queries inside a template string
  `*[_type=='startup' && defined(slug.current)]{
_id,
_createdAt,
  title,
  author->{_id,name,email,image,username },
  category,
  description,
  image,
  pitch,
  views


  
}`
); //this queries from sanity is always provided in the form of an array.

//down below we are trying to fetch the startup query data using the id of startup
export const StarupQueryBy_Id = defineQuery(`    
  *[_type=="startup" && _id==$id][0]{
  _id,
  title,
    category,
    author->{_id,name,username,email,image},
    description,
    image,
    pitch,
    views,
    _createdAt,
}
  
  `);

export const AuthorQueryBy_Id = defineQuery(`
  *[_type=="author" && _id==$id][0]{
  _id,
  name,
  username,
  email,
  bio,
  image,
   _createdAt,
  }
  
  
  `);

export const startUp_viewbyID = defineQuery(`
  *[_type=="startup" && _id==$id][0]{
  views}`);

//down belowe we are checking if the author exists or not depending upon the id of the profile which is authenticated through github and we are passing [0] to pass an object but not an array.
export const AuthorById = defineQuery(`        
  *[_type=="author" && id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  bio,
  image}`);

export const StartUpByAuthorRef = defineQuery(`
  *[_type=="startup" && author._ref==$id]{
  _id,
  id,
_createdAt,
  title,
  author->{_id,name,email,image,username },
  category,
  description,
  image,
  pitch,
  views
  
  }`);

export const StartUpbySlug = defineQuery(`
  *[_type == "playlist" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    select[]->{
      _id,
      _createdAt,
      title,
      slug,
      author->{
        _id,
        name,
        email,
        image,
        username,
        slug
      },
      category,
      description,
      image,
      pitch,
      views
    }
  }
`);
