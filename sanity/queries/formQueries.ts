import { client } from "../lib/client";

export type Form = {
  _id: string;
  formName: string;
  category: "internship" | "fellowship";
  googleUrlForm : string
};
export async function getFormsByCategory(
  category: "internship" | "fellowship",
) {
  const query = `*[_type == "forms" && category == $category]{
    _id,
    formName,
    category,
    googleUrlForm
  }[0]`;

  return await client.fetch(query, { category });
}
