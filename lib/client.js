import {createClient} from 'next-sanity'

export const sanityClient = createClient({
  projectId: "44jch7am",
  dataset: "production",
  useCdn: true,
});
