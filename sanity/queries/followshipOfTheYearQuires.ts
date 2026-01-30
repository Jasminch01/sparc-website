// @/sanity/queries/fellowshipQueries.ts
import { client } from "../lib/client";

export interface FellowshipMember {
  _id: string;
  name: string;
  title: string;
  image: string;
}

export interface FellowshipSection {
  sectionTitle: string;
}
export async function getFellowshipSection() {
  const query = `*[_type == "fellowshipSection"][0]{
    sectionTitle,
  }`;

  return await client.fetch(query);
}

export async function getAllFellowshipMembers() {
  const query = `*[_type == "fellowshipMember"] {
    _id,
    name,
    title,
    "image": image.asset->url,
  }`;

  return await client.fetch(query);
}
