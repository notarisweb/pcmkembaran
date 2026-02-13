import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "v9y48nrd",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
