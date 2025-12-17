import { client } from "../lib/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ReportData {
  _id: string;
  title: string;
  writtenOn: string;
  category: "reports" | "publications";
  date: string;
  description: any[];
  img: string;
  imgDes?: string;
  // Publications-specific fields
  publisher?: string;
  author?: string;
  publicationLanguage?: string;
  financialSupportBy?: string;
  releaseYear?: number;
  releaseMonth?: string;
}

export interface PaginatedReportResult {
  data: ReportData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function fetchReportDataPaginated(
  category?: string,
  startDate?: string,
  endDate?: string,
  page: number = 1,
  pageSize: number = 9
): Promise<PaginatedReportResult> {
  try {
    // Build filter conditions
    const filters = ['_type == "reports"'];

    if (category && category !== "All Categories") {
      filters.push(`category == $category`);
    }

    if (startDate && endDate) {
      filters.push(`writtenOn >= $startDate && writtenOn <= $endDate`);
    }

    const filterString = filters.join(" && ");

    // Query for total count
    const countQuery = `count(*[${filterString}])`;

    // Calculate offset and limit for pagination
    const offset = (page - 1) * pageSize;
    const limit = page * pageSize;

    // Query for paginated data
    const dataQuery = `*[${filterString}] | order(writtenOn desc) [${offset}...${limit}] {
      _id,
      title,
      writtenOn,
      category,
      date,
      description,
      "img": img.asset->url,
      imgDes,
      publisher,
      author,
      publicationLanguage,
      financialSupportBy,
      releaseYear,
      releaseMonth
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
      client.fetch<ReportData[]>(dataQuery, params),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated report data:", error);
    throw error;
  }
}

export async function fetchReportYears(): Promise<string[]> {
  try {
    const query = `array::unique(*[_type == "reports" && defined(writtenOn)]{
      "year": string::split(writtenOn, "-")[0]
    }.year) | order(@)`;

    const years = await client.fetch<string[]>(query);
    return years.filter(Boolean).reverse(); // Latest year first
  } catch (error) {
    console.error("Error fetching report years:", error);
    return [];
  }
}

export async function fetchReportBySlug(
  slug: string
): Promise<ReportData | null> {
  try {
    const query = `*[_type == "reports" && lower(title) match $slug][0] {
      _id,
      title,
      writtenOn,
      category,
      date,
      description,
      "img": img.asset->url,
      imgDes,
      publisher,
      author,
      publicationLanguage,
      financialSupportBy,
      releaseYear,
      releaseMonth
    }`;

    const result = await client.fetch<ReportData | null>(query, { slug });
    return result;
  } catch (error) {
    console.error("Error fetching report by slug:", error);
    return null;
  }
}

export async function fetchRelatedReports(
  currentReportId: string,
  category?: string,
  limit: number = 3
): Promise<ReportData[]> {
  try {
    const query = `*[
      _type == "reports" && 
      _id != $currentReportId
      ${category ? "&& category == $category" : ""}
    ] | order(writtenOn desc) [0...$limit] {
      _id,
      title,
      writtenOn,
      category,
      date,
      description,
      "img": img.asset->url,
      imgDes,
      publisher,
      author,
      publicationLanguage,
      financialSupportBy,
      releaseYear,
      releaseMonth
    }`;

    const params = {
      currentReportId,
      ...(category && { category }),
      limit,
    };

    const results = await client.fetch<ReportData[]>(query, params);
    return results || [];
  } catch (error) {
    console.error("Error fetching related reports:", error);
    return [];
  }
}
