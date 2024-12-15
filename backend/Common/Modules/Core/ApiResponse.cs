using System.Text.Json.Serialization;

namespace Common.Modules.Core;

/// <summary>
/// Represents a detailed API response that includes data.
/// </summary>
/// <typeparam name="TData">The type of the data included in the response.</typeparam>
public class ApiResponse<TData> : SimpleApiResponse
    where TData : notnull
{
    /// <summary>
    /// Gets or sets the data included in the response.
    /// </summary>
    [JsonPropertyOrder(50)]
    public required TData Data { get; set; }
}
