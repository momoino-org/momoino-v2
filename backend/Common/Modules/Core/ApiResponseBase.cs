using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace Common.Modules.Core;

/// <summary>
/// Represents a simple API response with basic information.
/// </summary>
public class ApiResponseBase
{
    /// <summary>
    /// Gets or sets the type of the response.
    /// </summary>
    [JsonPropertyOrder(-5)]
    public string Type { get; set; } = "T0000";

    /// <summary>
    /// Gets or sets the title of the response.
    /// </summary>
    [JsonPropertyOrder(-4)]
    public string Title { get; set; } = "Success";

    /// <summary>
    /// Gets or sets the HTTP status code of the response.
    /// </summary>
    [JsonPropertyOrder(-3)]
    public int Status { get; set; } = StatusCodes.Status200OK;

    /// <summary>
    /// Gets or sets the detailed description of the response.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyOrder(-2)]
    public string? Detail { get; set; }

    /// <summary>
    /// Gets or sets an instance identifier for the response.
    /// </summary>
    [JsonPropertyOrder(-1)]
    public string? Instance { get; set; }

    /// <summary>
    /// Gets or sets the trace identifier for the response.
    /// </summary>
    [JsonPropertyOrder(0)]
    public string? TraceId { get; set; }

    /// <summary>
    /// Gets or sets the timestamp of the response.
    /// </summary>
    [JsonPropertyOrder(1)]
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;
}
