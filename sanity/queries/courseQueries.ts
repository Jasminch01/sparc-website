/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";

export interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: any[];
  category: string;
  form: string;
  img: string;
  imgAlt?: string;
  price: string;
  rating: string;
  itemsSold: number;
  updated: string;
  whatYouLearn: string[];
}

interface PaginatedCoursesResult {
  courses: Course[];
  total: number;
  hasMore: boolean;
}

// Fetch all courses with pagination
export async function getAllCourses(
  page: number = 1,
  pageSize: number = 9
): Promise<PaginatedCoursesResult> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const query = `{
    "courses": *[_type == "course"] | order(_createdAt desc) [${start}...${end}] {
      _id,
      title,
      subtitle,
      description,
      category,
      form,
      "img": img.asset->url,
      "imgAlt": img.alt,
      price,
      rating,
      itemsSold,
      updated,
      whatYouLearn
    },
    "total": count(*[_type == "course"])
  }`;

  try {
    const result = await client.fetch(query);
    return {
      courses: result.courses,
      total: result.total,
      hasMore: end < result.total,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { courses: [], total: 0, hasMore: false };
  }
}

// Fetch courses by category with pagination
export async function getCoursesByCategory(
  category: string,
  page: number = 1,
  pageSize: number = 9
): Promise<PaginatedCoursesResult> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const query = `{
    "courses": *[_type == "course" && category == $category] | order(_createdAt desc) [${start}...${end}] {
      _id,
      title,
      subtitle,
      description,
      category,
      form,
      "img": img.asset->url,
      "imgAlt": img.alt,
      price,
      rating,
      itemsSold,
      updated,
      whatYouLearn
    },
    "total": count(*[_type == "course" && category == $category])
  }`;

  try {
    const result = await client.fetch(query, { category });
    return {
      courses: result.courses,
      total: result.total,
      hasMore: end < result.total,
    };
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    return { courses: [], total: 0, hasMore: false };
  }
}

// Fetch all unique categories
export async function getCourseCategories(): Promise<string[]> {
  const query = `*[_type == "course"] | order(category asc) {
    category
  }.category`;

  try {
    const categories = await client.fetch(query);
    return Array.from(new Set(categories)) as string[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
