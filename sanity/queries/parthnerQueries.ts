import { client } from "../lib/client";

export interface Partner {
  _id: string;
  name: string;
  logo: string;
  image: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  about: any[]; // Sanity block content
  link: string;
  order?: number;
}

export async function getAllPartners() {
  const query = `*[_type == "partner"] | order(order asc, name asc) {
    _id,
    name,
    "logo": logo.asset->url,
    "image": image.asset->url,
    about,
    link
  }`;

  try {
    const partners = await client.fetch(query);
    return partners;
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}
