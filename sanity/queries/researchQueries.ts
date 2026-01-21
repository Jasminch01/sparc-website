/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";

// TypeScript interfaces
export interface ResearchProject {
  _id: string;
  title: string;
  date: string;
  image: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  category: string;
  description: any[];
  status: string;
  duration: string;
  authors: string[];
  objectives: string[];
  location: string;
  fundedBy: string;
  researchers: string[];
  methodology: string;
  impact: string;
  pdfReport?: {
    asset: {
      url: string;
      originalFilename?: string;
    };
  };
}

export interface ResearchFilters {
  search?: string;
  category?: string;
  status?: string;
  startYear?: number;
  endYear?: number;
  page?: number;
  pageSize?: number;
}

export interface ResearchResponse {
  projects: ResearchProject[];
  total: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export async function getResearchProjects(
  filters: ResearchFilters = {},
): Promise<ResearchResponse> {
  const {
    search = "",
    category = "",
    status = "",
    startYear,
    endYear,
    page = 1,
    pageSize = 3,
  } = filters;

  // Build filter conditions
  const conditions: string[] = [];

  // Always include type filter
  conditions.push('_type == "research"');

  // Category filter - MUST be applied if provided
  if (category) {
    conditions.push(`category == "${category}"`);
  }

  // Status filter - MUST be applied if provided
  if (status) {
    conditions.push(`status == "${status}"`);
  }

  // Search filter (searches in title, methodology, and impact)
  if (search) {
    conditions.push(
      `(title match "${search}*" || methodology match "${search}*" || impact match "${search}*")`,
    );
  }

  // Year range filter
  if (startYear && endYear) {
    conditions.push(
      `dateTime(date) >= dateTime("${startYear}-01-01T00:00:00Z") && dateTime(date) <= dateTime("${endYear}-12-31T23:59:59Z")`,
    );
  } else if (startYear) {
    conditions.push(
      `dateTime(date) >= dateTime("${startYear}-01-01T00:00:00Z")`,
    );
  } else if (endYear) {
    conditions.push(`dateTime(date) <= dateTime("${endYear}-12-31T23:59:59Z")`);
  }

  // Build the filter string
  const filterString = `[${conditions.join(" && ")}]`;

  try {
    // Fetch total count with filters
    const countQuery = `count(*${filterString})`;
    const total = await client.fetch<number>(countQuery);
    // If no results, return empty
    if (total === 0) {
      return {
        projects: [],
        total: 0,
        hasMore: false,
        currentPage: page,
        totalPages: 0,
      };
    }

    // Calculate pagination using offset/limit pattern
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // For the slice, we need to calculate the end index
    // Start is offset, end is offset + limit - 1 (because Groq slice is inclusive)
    const startIndex = offset;
    const endIndex = offset + limit - 1;

    // Fetch paginated data using offset approach
    const dataQuery = `*${filterString} | order(date desc, _id asc) [${startIndex}...${endIndex + 1}] {
      _id,
      title,
      date,
      image {
        asset->{
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      category,
      description,
      status,
      duration,
      authors,
      objectives,
      location,
      fundedBy,
      researchers,
      methodology,
      impact
    }`;

    const projects = await client.fetch<ResearchProject[]>(dataQuery);

    const totalPages = Math.ceil(total / pageSize);
    const hasMore = page < totalPages;

    return {
      projects,
      total,
      hasMore,
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching research projects:", error);
    console.error("Failed query filters:", {
      category,
      status,
      page,
      pageSize,
    });
    throw error;
  }
}
export async function getResearchCategories(): Promise<string[]> {
  const query = `array::unique(*[_type == "research"].category)`;
  return await client.fetch<string[]>(query);
}

export async function getResearchProjectBySlug(slug: string) {
  const query = `
    *[_type == "research" && lower(title) match lower($searchTerm)][0] {
      _id,
      _createdAt,
      title,
      date,
      description,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      category,
      status,
      duration,
      location,
      fundedBy,
      methodology,
      impact,
pdfReport {
      asset->{
        url,
        originalFilename
      }
    },
      authors,
      researchers,
      objectives
    }
  `;

  try {
    // Add wildcards for flexible matching
    const pattern = `*${slug}*`;
    const result = await client.fetch(query, { searchTerm: pattern });
    return result;
  } catch (error) {
    console.error("Error fetching research project by slug:", error);
    return null;
  }
}
