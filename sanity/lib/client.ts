import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})//here we are setting the useCdn false so that rather than retrieving data from cached part to UI which only revalidates after 60 sec, setting it false means it always retrieve the datas from the source but not the cached part.
