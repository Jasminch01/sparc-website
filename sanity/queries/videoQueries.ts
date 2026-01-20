import { client } from "../lib/client";

export interface Video {
  _id: string;
  title: string;
  url: string;
  order?: number;
  isActive: boolean;
}

export async function getAllVideos(): Promise<Video[]> {
  const query = `*[_type == "video" && isActive == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    url,
    order,
    isActive
  }`;

  try {
    const videos = await client.fetch(query);
    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export async function getVideoById(id: string): Promise<Video | null> {
  const query = `*[_type == "video" && _id == $id][0] {
    _id,
    title,
    url,
    "thumbnail": thumbnail.asset->url,
    description,
    order,
    isActive
  }`;

  try {
    const video = await client.fetch(query, { id });
    return video;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}