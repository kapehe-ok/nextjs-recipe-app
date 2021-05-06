import client from "@sanity/client";

export const sanityClient = client({
  projectId: "44jch7am",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: true,
});
