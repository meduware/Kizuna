import { baseUrls } from "../constants";

export const apiHandler = async (api: string, params: any, method: string) => {
  const url = new URL(api.includes("http") ? api : baseUrls.API + api);
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url, {
      method,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
