import { baseUrls } from "../constants";

function normalizeParams(obj: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object") {
      // Array veya Object olan her şeyi JSON.stringify yap
      result[key] = JSON.stringify(value);
    } else if (typeof value !== "undefined") {
      result[key] = String(value);
    }
  }

  return result;
}

export const apiHandler = async (api: string, params: any, method: string) => {
  const url = new URL(api.includes("http") ? api : baseUrls.API + api);

  // Burada normalize ediyoruz
  const normalizedParams = normalizeParams(params);

  url.search = new URLSearchParams(normalizedParams).toString();

  try {
    const response = await fetch(url.toString(), {
      method,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
