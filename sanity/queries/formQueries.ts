import { client } from "../lib/client";

export type From = {
  _id: string;
  formName: string;
  category: "internship" | "fellowship";
  form: string;
}
export async function getFormsByCategory(category: 'internship' | 'fellowship') {
  const query = `*[_type == "forms" && category == $category]{
    _id,
    formName,
    category,
    form
  }[0]`;
  
  return await client.fetch(query, { category });
}