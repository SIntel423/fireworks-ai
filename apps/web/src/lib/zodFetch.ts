import { z } from 'zod';

/**
 * Fetches data from a URL and parses the response using a Zod schema.
 *
 * @param url - The URL to fetch data from.
 * @param responseSchema - A Zod schema that defines the expected response structure.
 * @returns A Promise that resolves to the parsed response data.
 * @throws {Error} If the response data fails to validate against the provided schema.
 */
const zodFetch = async <TResponseSchema extends z.Schema>(
  url: string,
  responseSchema: TResponseSchema,
): Promise<z.infer<TResponseSchema>> => {
  try {
    const response = await fetch(url),
      json = await response.json();

    return responseSchema.parse(json);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Failed to fetch data:' + JSON.stringify(error.issues));
    }
  }
};

export default zodFetch;
