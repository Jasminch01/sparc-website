/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";

export interface ProjectData {
  _id: string;
  title: string;
  status: "Ongoing" | "Completed";
  date: string;
  fundedBy: string;
  description: any[];
  projectImage: string;
  isHighlighted?: boolean;
}

export interface PaginatedProjectResult {
  data: ProjectData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Fetch projects with pagination and optional status filter
export async function fetchProjectsPaginated(
  status?: string,
  page: number = 1,
  pageSize: number = 6
): Promise<PaginatedProjectResult> {
  try {
    // Build filter conditions
    const filters = ['_type == "projects"'];

    if (status && status !== "all") {
      filters.push(`status == $status`);
    }

    const filterString = filters.join(" && ");

    // Query for total count
    const countQuery = `count(*[${filterString}])`;

    // Calculate offset and limit for pagination
    const offset = (page - 1) * pageSize;
    const limit = page * pageSize;

    // Query for paginated data - prioritize highlighted projects
    const dataQuery = `*[${filterString}] | order(isHighlighted desc, date desc) [${offset}...${limit}] {
      _id,
      title,
      status,
      date,
      fundedBy,
      description,
      "projectImage": projectImage.asset->url,
      isHighlighted
    }`;

    const params: any = {};

    if (status && status !== "all") {
      params.status = status;
    }

    // Fetch both count and data
    const [total, data] = await Promise.all([
      client.fetch<number>(countQuery, params),
      client.fetch<ProjectData[]>(dataQuery, params),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated project data:", error);
    throw error;
  }
}

// Fetch single project by title (slug)
export async function fetchProjectByTitle(
  title: string
): Promise<ProjectData | null> {
  try {
    const query = `*[_type == "projects" && lower(title) match $title][0] {
      _id,
      title,
      status,
      date,
      fundedBy,
      description,
      "projectImage": projectImage.asset->url,
      isHighlighted
    }`;

    const result = await client.fetch<ProjectData | null>(query, { title });
    return result;
  } catch (error) {
    console.error("Error fetching project by title:", error);
    return null;
  }
}

// Fetch highlighted projects (max 2)
export async function fetchHighlightedProjects(): Promise<ProjectData[]> {
  try {
    const query = `*[_type == "projects" && isHighlighted == true] | order(date desc) [0...2] {
      _id,
      title,
      status,
      date,
      fundedBy,
      description,
      "projectImage": projectImage.asset->url,
      isHighlighted
    }`;

    const results = await client.fetch<ProjectData[]>(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching highlighted projects:", error);
    return [];
  }
}

// Fetch related projects (same status, exclude current)
export async function fetchRelatedProjects(
  currentProjectId: string,
  status?: string,
  limit: number = 3
): Promise<ProjectData[]> {
  try {
    const query = `*[
      _type == "projects" && 
      _id != $currentProjectId
      ${status ? "&& status == $status" : ""}
    ] | order(isHighlighted desc, date desc) [0...$limit] {
      _id,
      title,
      status,
      date,
      fundedBy,
      description,
      "projectImage": projectImage.asset->url,
      isHighlighted
    }`;

    const params = {
      currentProjectId,
      ...(status && { status }),
      limit,
    };

    const results = await client.fetch<ProjectData[]>(query, params);
    return results || [];
  } catch (error) {
    console.error("Error fetching related projects:", error);
    return [];
  }
}

// Fetch all available project statuses
export async function fetchProjectStatuses(): Promise<string[]> {
  try {
    const query = `array::unique(*[_type == "projects" && defined(status)].status) | order(@)`;

    const statuses = await client.fetch<string[]>(query);
    return statuses.filter(Boolean);
  } catch (error) {
    console.error("Error fetching project statuses:", error);
    return [];
  }
}
