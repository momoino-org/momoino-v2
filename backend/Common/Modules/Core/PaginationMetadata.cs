using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Common.Modules.Core;

/// <summary>
/// Represents metadata for paginated results, including current page, total pages, page size and total item count.
/// Used in conjunction with PagedApiResponse to provide pagination information for API responses.
/// </summary>
/// <param name="CurrentPage">The current page number, using 1-based indexing</param>
/// <param name="PageSize">The maximum number of items returned per page</param>
/// <param name="TotalItems">The total number of items available across all pages</param>
public record PaginationMetadata(
    [property: JsonPropertyOrder(0)]
    [property: Range(1, int.MaxValue, ErrorMessage = "Current page must be greater than 0")]
        int CurrentPage,
    [property: JsonPropertyOrder(2)]
    [property: Range(1, int.MaxValue, ErrorMessage = "Page size must be greater than 0")]
        int PageSize,
    [property: JsonPropertyOrder(3)]
    [property: Range(0, int.MaxValue, ErrorMessage = "Total items cannot be negative")]
        int TotalItems
)
{
    /// <summary>
    /// Gets the total number of pages based on the page size and total items.
    /// </summary>
    [JsonPropertyOrder(1)]
    public int TotalPages => (int)Math.Ceiling((double)this.TotalItems / this.PageSize);
}
