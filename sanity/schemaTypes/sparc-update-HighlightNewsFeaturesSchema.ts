// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Rule } from "@sanity/types";

// // Update
// export const Highlight_Stories_Features = {
//   name: "highlights",
//   title: "Highlight",
//   type: "document",
//   fields: [
//     {
//       name: "title",
//       title: "Title",
//       type: "string",
//       validation: (Rule: Rule) => Rule.required(),
//     },

//     {
//       name: "date",
//       title: "Date",
//       type: "date",
//       options: {
//         dateFormat: "DD MMMM YYYY",
//       },
//       description: 'e.g., "October 2025"',
//       validation: (Rule: Rule) => Rule.required(),
//     },
//     {
//       name: "category",
//       title: "Category",
//       type: "string",
//       options: {
//         list: [
//           { title: "Highlight", value: "highlight" },
//           { title: "Featured Stories", value: "FEATURED_STORIES" },
//           { title: "Latest News", value: "LATEST_NEWS" },
//         ],
//         layout: "dropdown",
//       },
//       validation: (Rule: Rule) => Rule.required(),
//     },
//     {
//       name: "descriptin",
//       title: "Description",
//       type: "array",
//       of: [{ type: "block" }],
//       validation: (Rule: Rule) => Rule.required(),
//     },
//     {
//       name: "featuredImage",
//       title: "Featured Image",
//       type: "image",
//       options: {
//         hotspot: true,
//       },
//       hidden: ({ parent }: { parent?: any }) =>
//         parent?.category === "LATEST_NEWS" && !!parent?.video,
//     },
//     {
//       name: "video",
//       title: "Video URL",
//       type: "url",
//       description: "YouTube or other video URL",
//       hidden: ({ parent }: { parent?: any }) =>
//         parent?.category !== "LATEST_NEWS",
//     },
//   ],
//   preview: {
//     select: {
//       title: "title",
//       category: "category",
//       date: "date",
//       media: "img",
//       video: "video",
//     },
//     prepare(selection: Record<string, any>) {
//       const { title, category, date, media, video } = selection;
//       const mediaType = video ? "🎥 Video" : "📷 Image";
//       return {
//         title: title || "Untitled",
//         subtitle: `${category || "No category"} - ${date || "No date"} (${mediaType})`,
//         media: media,
//       };
//     },
//   },
//   orderings: [
//     {
//       title: "Date, New",
//       name: "dateDesc",
//       by: [{ field: "date", direction: "desc" }],
//     },
//     {
//       title: "Category",
//       name: "categoryAsc",
//       by: [{ field: "category", direction: "asc" }],
//     },
//   ],
// };
