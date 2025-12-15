import { client } from "@/sanity/lib/client";

export interface Blog {
  title: string;
  subtitle: string;
  description: unknown;
  date: string;
  writtenBy: string;
  img: string;
  category: string;
}

export interface FetchBlogsParams {
  category?: string;
  sortBy?: "latest" | "old";
  page?: number;
  itemsPerPage?: number;
}

export interface FetchBlogsResult {
  blogs: Blog[];
  total: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Fetch all unique categories from blogs
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const query = `*[_type == "blog"] {
      category
    }`;
    const data = await client.fetch(query);
    const uniqueCategories = Array.from(
      new Set(data.map((blog: Blog) => blog.category))
    ) as string[];
    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching categories from Sanity:", error);
    return [];
  }
};

/**
 * Fetch blogs with pagination, sorting, and filtering
 */
export const fetchBlogs = async ({
  category = "All",
  sortBy = "latest",
  page = 1,
  itemsPerPage = 6,
}: FetchBlogsParams): Promise<FetchBlogsResult> => {
  try {
    // Build the filter based on category
    const categoryFilter =
      category === "All"
        ? `_type == "blog"`
        : `_type == "blog" && category == "${category}"`;

    // Build the order based on sortBy (latest/old)
    const orderClause =
      sortBy === "latest" ? "order(date desc)" : "order(date asc)";

    // Calculate pagination
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Fetch total count for pagination
    const countQuery = `count(*[${categoryFilter}])`;
    const total = await client.fetch(countQuery);

    // Fetch blogs with pagination
    const query = `*[${categoryFilter}] | ${orderClause} [${start}...${end}] {
      title,
      subtitle,
      description,
      date,
      writtenBy,
      "img": img.asset->url,
      category
    }`;

    const blogs = await client.fetch(query);

    return {
      blogs,
      total,
      totalPages: Math.ceil(total / itemsPerPage),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching blogs from Sanity:", error);
    return {
      blogs: [],
      total: 0,
      totalPages: 0,
      currentPage: page,
    };
  }
};

/**
 * Fetch a single blog by slug
 */
export const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
      title,
      subtitle,
      description,
      date,
      writtenBy,
      "img": img.asset->url,
      category
    }`;

    const blog = await client.fetch(query, { slug });
    return blog;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
};
