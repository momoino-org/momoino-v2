using System.Text.Json.Serialization;

namespace Common.Modules.Core;

/// <summary>
/// Represents a paginated API response that extends ApiResponse with pagination metadata.
/// </summary>
/// <typeparam name="TData">The type of the enumerable data included in the response.</typeparam>
public class ApiResponseWithPagination<TData> : ApiResponseWithData<TData>
    where TData : notnull, IReadOnlyCollection<object>
{
    /// <summary>
    /// Gets or sets the pagination metadata containing page information and counts.
    /// </summary>
    [JsonPropertyOrder(60)]
    public required PaginationMetadata Pagination { get; set; }
}
