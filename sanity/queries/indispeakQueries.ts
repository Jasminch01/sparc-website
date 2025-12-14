import { client } from "../lib/client";

// Fetch paginated stories by year range
export async function getIndiSpeakStories(
  yearRange: string,
  page: number = 1,
  pageSize: number = 4
) {
  const [startYear, endYear] = yearRange.split("-").map(Number);
  const offset = (page - 1) * pageSize;

  // Create date range strings for exact filtering
  const startDate = `${startYear}-01-01`;
  const endDate = `${endYear}-12-31`;

  const query = `{
    "stories": *[_type == "indispeakStories" && 
      writtenOn >= "${startDate}" && 
      writtenOn <= "${endDate}"
    ] | order(writtenOn desc) [${offset}...${offset + pageSize}] {
      _id,
      title,
      writtenOn,
      des,
      "imgUrl": img.asset->url,
      autorName,
      imgAlt
    },
    "total": count(*[_type == "indispeakStories" && 
      writtenOn >= "${startDate}" && 
      writtenOn <= "${endDate}"
    ])
  }`;

  return await client.fetch(query);
}

// Fetch single story
export async function getIndiSpeakStory(id: string) {
  const query = `*[_type == "indispeakStories" && _id == $id][0] {
    _id,
    title,
    writtenOn,
    des,
    img {
      asset->{
        url,
        metadata {
          dimensions
        }
      }
    },
    autorName,
    imgAlt
  }`;

  return await client.fetch(query, { id });
}
