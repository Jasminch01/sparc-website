/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";

export interface ArchiveData {
  _id: string;
  title: string;
  subtitle: string;
  img: string;
  description: any[];
  date: string;
  category: string;
}

export interface PaginatedArchiveResult {
  data: ArchiveData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function fetchArchiveDataPaginated(
  category?: string,
  startDate?: string,
  endDate?: string,
  page: number = 1,
  pageSize: number = 9,
): Promise<PaginatedArchiveResult> {
  try {
    // Build filter conditions
    const filters = ['_type == "archive"'];

    if (category && category !== "All Categories") {
      filters.push(`category == $category`);
    }

    if (startDate && endDate) {
      filters.push(`date >= $startDate && date <= $endDate`);
    }

    const filterString = filters.join(" && ");

    // Query for total count
    const countQuery = `count(*[${filterString}])`;

    // Calculate offset and limit for pagination
    const offset = (page - 1) * pageSize;
    const limit = page * pageSize;

    // Query for paginated data
    const dataQuery = `*[${filterString}] | order(date desc) [${offset}...${limit}] {
      _id,
      title,
      subtitle,
      "img": img.asset->url,
      description,
      date,
      category
    }`;

    const params: any = {};

    if (category && category !== "All Categories") {
      params.category = category;
    }

    if (startDate && endDate) {
      params.startDate = startDate;
      params.endDate = endDate;
    }

    // Fetch both count and data
    const [total, data] = await Promise.all([
      client.fetch<number>(countQuery, params),
      client.fetch<ArchiveData[]>(dataQuery, params),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated archive data:", error);
    throw error;
  }
}

export async function fetchArchiveYears(): Promise<string[]> {
  try {
    const query = `array::unique(*[_type == "archive" && defined(date)]{
      "year": string::split(date, "-")[0]
    }.year) | order(@)`;

    const years = await client.fetch<string[]>(query);
    return years.filter(Boolean).reverse(); // Latest year first
  } catch (error) {
    console.error("Error fetching archive years:", error);
    return [];
  }
}

export async function fetchArchiveBySlug(
  slug: string,
): Promise<ArchiveData | null> {
  try {
    const query = `*[_type == "archive" && lower(title) match $slug][0] {
      _id,
      title,
      subtitle,
      "img": img.asset->url,
      description,
      date,
      category
    }`;

    const result = await client.fetch<ArchiveData | null>(query, { slug });
    return result;
  } catch (error) {
    console.error("Error fetching archive by slug:", error);
    return null;
  }
}

export async function fetchRelatedArchives(
  currentArchiveId: string,
  category?: string,
  limit: number = 3,
): Promise<ArchiveData[]> {
  try {
    const query = `*[
      _type == "archive" && 
      _id != $currentArchiveId
      ${category ? "&& category == $category" : ""}
    ] | order(_createdAt desc) [0...$limit] {
      _id,
      title,
      subtitle,
      "img": img.asset->url,
      description,
      date,
      category
    }`;

    const params = {
      currentArchiveId,
      ...(category && { category }),
      limit,
    };

    const results = await client.fetch<ArchiveData[]>(query, params);
    return results || [];
  } catch (error) {
    console.error("Error fetching related archives:", error);
    return [];
  }
}

export const fetchArchiveCategories = async (): Promise<string[]> => {
  const query = `*[_type == "archive" && defined(category)] | order(category asc) {
    "category": category
  }`;

  try {
    const results = await client.fetch(query);
    // Extract unique categories
    const uniqueCategories = [
      ...new Set(results.map((item: { category: string }) => item.category)),
    ];
    return uniqueCategories as string[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
