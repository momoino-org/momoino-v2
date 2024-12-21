import * as v from 'valibot';

/**
 * Base schema for API responses containing common metadata fields
 */
export const ApiResponseBaseSchema = v.strictObject({
  /** The type identifier for the response */
  type: v.string(),
  /** The title or summary of the response */
  title: v.string(),
  /** The HTTP status code */
  status: v.number(),
  /** Optional detailed description */
  detail: v.optional(v.string()),
  /** Optional URL of the request that generated this response */
  instance: v.optional(v.string()),
  /** Optional trace ID for debugging/logging */
  traceId: v.optional(v.string()),
  /** ISO timestamp when the response was generated */
  timestamp: v.string(),
});

export type ApiResponseBase = v.InferOutput<typeof ApiResponseBaseSchema>;

/**
 * API response schema that includes a data payload
 * @template T The schema type for the data
 */
export function createApiResponseWithDataSchema<T>(
  dataSchema: v.GenericSchema<T>,
) {
  return v.strictObject({
    ...ApiResponseBaseSchema.entries,
    /** The main data payload */
    data: dataSchema,
  });
}

export type ApiResponseWithData<T> = v.InferInput<
  ReturnType<typeof createApiResponseWithDataSchema<T>>
>;

/**
 * API response schema for paginated data that includes both the data and pagination metadata
 * @template T The schema type for the data array being paginated
 */
export function createApiResponseWithPaginationSchema<T>(
  dataSchema: v.GenericSchema<T>,
) {
  return v.strictObject({
    ...createApiResponseWithDataSchema(dataSchema).entries,
    pagination: v.strictObject({
      /** Current page number (1-based) */
      currentPage: v.number(),
      /** Maximum number of items per page */
      pageSize: v.number(),
      /** Total number of pages available */
      totalPages: v.number(),
      /** Total number of items across all pages */
      totalItems: v.number(),
    }),
  });
}

export type ApiResponseWithPagination<T extends v.AnySchema> = v.InferInput<
  ReturnType<typeof createApiResponseWithPaginationSchema<T>>
>;
