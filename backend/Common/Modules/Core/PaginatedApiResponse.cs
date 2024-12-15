using System.Text.Json.Serialization;

namespace Common.Modules.Core;

/// <summary>
/// Represents a paginated API response that includes data and pagination information.
/// </summary>
/// <typeparam name="TData">The type of the data included in the response.</typeparam>
public class PaginatedApiResponse<TData> : ApiResponse<TData>
    where TData : notnull
{
    /// <summary>
    /// Gets or sets the pagination information for the response.
    /// </summary>
    [JsonPropertyOrder(60)]
    public required object Pagination { get; set; }
}
