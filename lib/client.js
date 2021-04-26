import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "44jch7am",
  dataset: "production",
  useCdn: true,
});
