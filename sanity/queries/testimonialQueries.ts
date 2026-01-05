// lib/sanity/queries/testimonials.ts
import { groq } from "next-sanity";
import { client } from "../lib/client";

// GROQ Query for fetching active testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial" && isActive == true] | order(order asc) {
    _id,
    testimoniname,
    title,
    description,
    order
  }
`;

// Type definition for testimonial data
export interface TestimonialData {
  _id: string;
  title : string;
  testimoniname: string;
  description: string;
  order?: number;
}

// Fetch function for active testimonials
export async function fetchTestimonials(): Promise<TestimonialData[]> {
  try {
    const testimonials =
      await client.fetch<TestimonialData[]>(testimonialsQuery);
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
