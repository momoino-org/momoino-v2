using System.Diagnostics;
using System.Net;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;

namespace Common.Modules.Core;

/// <summary>
/// A utility class for wrapping API responses in a consistent format.
/// </summary>
public static class ResponseWrapper
{
    /// <summary>
    /// Fills the given <see cref="SimpleApiResponse"/> with the specified data.
    /// </summary>
    private static void Fill(
        SimpleApiResponse simpleApiResponse,
        HttpContext? httpContext = null,
        HttpStatusCode statusCode = HttpStatusCode.OK,
        string? type = null,
        string? title = null,
        string? detail = null
    )
    {
        if (type is not null)
        {
            simpleApiResponse.Type = type;
        }

        if (title is not null)
        {
            simpleApiResponse.Title = title;
        }

        if (detail is not null)
        {
            simpleApiResponse.Detail = detail;
        }

        simpleApiResponse.Instance = httpContext?.Request.GetDisplayUrl();

        var traceId = Activity.Current?.Id ?? httpContext?.TraceIdentifier;

        if (traceId is not null)
        {
            simpleApiResponse.TraceId = traceId;
        }

        simpleApiResponse.Status = statusCode;
    }

    /// <summary>
    /// Creates a simple API response.
    /// </summary>
    public static SimpleApiResponse Simple(
        HttpContext? httpContext = null,
        HttpStatusCode statusCode = HttpStatusCode.OK,
        string? type = null,
        string? title = null,
        string? detail = null
    )
    {
        var apiResponse = new SimpleApiResponse();

        Fill(apiResponse, httpContext, statusCode, type, title, detail);

        return apiResponse;
    }

    /// <summary>
    /// Creates a normal API response with data.
    /// </summary>
    public static ApiResponse<TData> Normal<TData>(
        TData data,
        HttpContext? httpContext = null,
        HttpStatusCode statusCode = HttpStatusCode.OK,
        string? type = null,
        string? title = null,
        string? detail = null
    )
    {
        ApiResponse<TData> apiResponse = new() { Data = data };

        Fill(apiResponse, httpContext, statusCode, type, title, detail);

        return apiResponse;
    }

    /// <summary>
    /// Creates a normal API response with data using a required HTTP context.
    /// </summary>
    public static ApiResponse<TData> Normal<TData>(HttpContext httpContext, TData data)
    {
        ApiResponse<TData> apiResponse = new() { Data = data };

        Fill(apiResponse, httpContext);

        return apiResponse;
    }
}

/// <summary>
/// Represents a simple API response with basic information.
/// </summary>
public class SimpleApiResponse
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
    public HttpStatusCode Status { get; set; } = HttpStatusCode.OK;

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

/// <summary>
/// Represents a detailed API response that includes data.
/// </summary>
/// <typeparam name="TData">The type of the data included in the response.</typeparam>
public class ApiResponse<TData> : SimpleApiResponse
{
    /// <summary>
    /// Gets or sets the data included in the response.
    /// </summary>
    [JsonPropertyOrder(50)]
    public required TData Data { get; set; }
}

/// <summary>
/// Represents a paginated API response that includes data and pagination information.
/// </summary>
/// <typeparam name="TData">The type of the data included in the response.</typeparam>
public class PaginatedApiResponse<TData> : ApiResponse<TData>
{
    /// <summary>
    /// Gets or sets the pagination information for the response.
    /// </summary>
    [JsonPropertyOrder(60)]
    public required object Pagination { get; set; }
}
