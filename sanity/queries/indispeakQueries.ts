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
      "imgLqip": img.asset->metadata.lqip,
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
          dimensions,
          lqip
        }
      }
    },
    autorName,
    imgAlt
  }`;

  return await client.fetch(query, { id });
}

export interface FeaturedStory {
  _id: string;
  title: string;
  writtenOn: string;
  des: string;
  imageUrl: string;
  autorName?: string;
  imgAlt: string;
  isFeatured: boolean;
}

export async function getFeaturedStories(limit: number = 3) {
  const query = `*[_type == "indispeakStories" && isFeatured == true] | order(writtenOn desc) [0...${limit}] {
    _id,
    title,
    writtenOn,
    des,
    img {
      asset->{
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    autorName,
    imgAlt,
    isFeatured
  }`;

  return await client.fetch(query);
}

// Fetch all available years to generate dynamic ranges
export async function getIndiSpeakYears() {
  const query = `*[_type == "indispeakStories" && defined(writtenOn)] { 
    "year": writtenOn
  }`;
  
  try {
    const results = await client.fetch(query) as { year: string }[];
    const years = results.map((item) => new Date(item.year).getFullYear());
    const uniqueYears = Array.from(new Set(years)).sort((a, b) => b - a);
    
    const ranges: string[] = [];
    uniqueYears.forEach((year: number) => {
      const range = `${year}-${year + 1}`;
      if (!ranges.includes(range)) {
        ranges.push(range);
      }
      const prevRange = `${year - 1}-${year}`;
      if (!ranges.includes(prevRange)) {
        ranges.push(prevRange);
      }
    });

    return Array.from(new Set(ranges)).sort((a, b) => b.localeCompare(a));
  } catch (error) {
    console.error("Error fetching indispeak years:", error);
    return [];
  }
}
