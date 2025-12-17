/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";

export interface EventData {
  _id: string;
  title: string;
  status: "Upcoming" | "Ongoing";
  date: string;
  timeLeft?: string;
  description: any[];
  img: string;
  isHighlighted?: boolean;
}

export interface PaginatedEventResult {
  data: EventData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Fetch events with pagination and optional status filter
export async function fetchEventsPaginated(
  status?: string,
  page: number = 1,
  pageSize: number = 6
): Promise<PaginatedEventResult> {
  try {
    // Build filter conditions
    const filters = ['_type == "events"'];

    if (status && status !== "all") {
      filters.push(`status == $status`);
    }

    const filterString = filters.join(" && ");

    // Query for total count
    const countQuery = `count(*[${filterString}])`;

    // Calculate offset and limit for pagination
    const offset = (page - 1) * pageSize;
    const limit = page * pageSize;

    // Query for paginated data - prioritize highlighted event
    const dataQuery = `*[${filterString}] | order(isHighlighted desc, date desc) [${offset}...${limit}] {
      _id,
      title,
      status,
      date,
      timeLeft,
      description,
      "img": img.asset->url,
      isHighlighted
    }`;

    const params: any = {};

    if (status && status !== "all") {
      params.status = status;
    }

    // Fetch both count and data
    const [total, data] = await Promise.all([
      client.fetch<number>(countQuery, params),
      client.fetch<EventData[]>(dataQuery, params),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated event data:", error);
    throw error;
  }
}

// Fetch single event by title (slug)
export async function fetchEventByTitle(
  title: string
): Promise<EventData | null> {
  try {
    const query = `*[_type == "events" && lower(title) match $title][0] {
      _id,
      title,
      status,
      date,
      timeLeft,
      description,
      "img": img.asset->url,
      isHighlighted
    }`;

    const result = await client.fetch<EventData | null>(query, { title });
    return result;
  } catch (error) {
    console.error("Error fetching event by title:", error);
    return null;
  }
}

// Fetch highlighted event (max 1)
export async function fetchHighlightedEvent(): Promise<EventData | null> {
  try {
    const query = `*[_type == "events" && isHighlighted == true] | order(date desc) [0] {
      _id,
      title,
      status,
      date,
      timeLeft,
      description,
      "img": img.asset->url,
      isHighlighted
    }`;

    const result = await client.fetch<EventData | null>(query);
    return result || null;
  } catch (error) {
    console.error("Error fetching highlighted event:", error);
    return null;
  }
}

// Fetch related events (same status, exclude current)
export async function fetchRelatedEvents(
  currentEventId: string,
  status?: string,
  limit: number = 3
): Promise<EventData[]> {
  try {
    const query = `*[
      _type == "events" && 
      _id != $currentEventId
      ${status ? "&& status == $status" : ""}
    ] | order(isHighlighted desc, date desc) [0...$limit] {
      _id,
      title,
      status,
      date,
      timeLeft,
      description,
      "img": img.asset->url,
      isHighlighted
    }`;

    const params = {
      currentEventId,
      ...(status && { status }),
      limit,
    };

    const results = await client.fetch<EventData[]>(query, params);
    return results || [];
  } catch (error) {
    console.error("Error fetching related events:", error);
    return [];
  }
}

// Fetch all available event statuses
export async function fetchEventStatuses(): Promise<string[]> {
  try {
    const query = `array::unique(*[_type == "events" && defined(status)].status) | order(@)`;

    const statuses = await client.fetch<string[]>(query);
    return statuses.filter(Boolean);
  } catch (error) {
    console.error("Error fetching event statuses:", error);
    return [];
  }
}

// Fetch upcoming events (for homepage/featured sections)
export async function fetchUpcomingEvents(
  limit: number = 3
): Promise<EventData[]> {
  try {
    const query = `*[_type == "events" && status == "Upcoming"] | order(isHighlighted desc, date asc) [0...$limit] {
      _id,
      title,
      status,
      date,
      timeLeft,
      description,
      "img": img.asset->url,
      isHighlighted
    }`;

    const results = await client.fetch<EventData[]>(query, { limit });
    return results || [];
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}
