using System.Text.Json.Serialization;

namespace Common.Modules.Core;

/// <summary>
/// Represents pagination metadata containing information about the current page, total pages, page size and total items.
/// </summary>
/// <param name="CurrentPage"> Gets or sets the current page number (1-based indexing). </param>
/// <param name="TotalPages"> Gets or sets the total number of pages based on page size and total items. </param>
/// <param name="PageSize"> Gets or sets the number of items displayed per page. </param>
/// <param name="TotalItems"> Gets or sets the total number of items in the entire collection across all pages. </param>
public record PaginationMetadata(
    [property: JsonPropertyOrder(0)] int CurrentPage,
    [property: JsonPropertyOrder(1)] int TotalPages,
    [property: JsonPropertyOrder(2)] int PageSize,
    [property: JsonPropertyOrder(3)] int TotalItems
);
