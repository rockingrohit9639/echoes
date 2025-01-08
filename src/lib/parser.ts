import { type ZodSchema } from 'zod'

/**
 * This function parses the JSON response returned from the AI
 * and returns the zod validated data.
 */
export function validateJSONResponse(response: string, schema: ZodSchema) {
  const finalStr = response.replaceAll(`\`\`\`json`, '').replaceAll(`\`\`\``, '').trim()
  return schema.parse(JSON.parse(finalStr))
}
