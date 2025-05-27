import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  token,
 
})//here we are setting the useCdn false so that rather than retrieving data from cached part to UI which only revalidates after 60 sec, setting it false means it always retrieve the datas from the source but not the cached part.

if(!writeClient.config().token){
    throw new Error('write token not found!')
}

