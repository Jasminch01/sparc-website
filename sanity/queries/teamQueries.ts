import { client } from "../lib/client";

export async function getAllTeams() {
  const query = `*[_type == "Team"] | order(_createdAt desc) {
    _id,
    name,
    title,
    "image": image.asset->url,
    category
  }`;

  try {
    const teams = await client.fetch(query);
    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}
