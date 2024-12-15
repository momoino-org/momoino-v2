using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;

namespace Common.Modules.Core;

/// <summary>
/// A utility class for wrapping API responses in a consistent format.
/// </summary>
public static class ResponseWrapper
{
    /// <summary>
    /// Populates common response fields for any API response type
    /// </summary>
    private static void PopulateResponseFields(
        SimpleApiResponse response,
        HttpContext? httpContext,
        ResponseOptions options
    )
    {
        // Set optional fields if provided
        if (options.Type is not null)
        {
            response.Type = options.Type;
        }

        if (options.Title is not null)
        {
            response.Title = options.Title;
        }

        if (options.Detail is not null)
        {
            response.Detail = options.Detail;
        }

        // Set request URL if context available
        response.Instance = httpContext?.Request.GetDisplayUrl();

        // Set trace ID from current activity or context
        var traceId = Activity.Current?.Id ?? httpContext?.TraceIdentifier;
        if (traceId is not null)
        {
            response.TraceId = traceId;
        }

        response.Status = options.StatusCode;
    }

    /// <summary>
    /// Creates a simple API response without data
    /// </summary>
    public static SimpleApiResponse Simple(
        HttpContext? httpContext = null,
        int statusCode = StatusCodes.Status200OK,
        string? type = null,
        string? title = null,
        string? detail = null
    )
    {
        var response = new SimpleApiResponse();
        var options = new ResponseOptions(statusCode, type, title, detail);

        PopulateResponseFields(response, httpContext, options);

        return response;
    }

    /// <summary>
    /// Creates an API response containing data with optional parameters
    /// </summary>
    public static ApiResponse<TData> Normal<TData>(
        TData data,
        HttpContext? httpContext = null,
        int statusCode = StatusCodes.Status200OK,
        string? type = null,
        string? title = null,
        string? detail = null
    )
        where TData : notnull
    {
        var response = new ApiResponse<TData> { Data = data };
        var options = new ResponseOptions(statusCode, type, title, detail);

        PopulateResponseFields(response, httpContext, options);

        return response;
    }

    /// <summary>
    /// Creates an API response containing data with required HTTP context
    /// </summary>
    public static ApiResponse<TData> Normal<TData>(HttpContext httpContext, TData data)
        where TData : notnull
    {
        var response = new ApiResponse<TData> { Data = data };
        var options = new ResponseOptions(StatusCodes.Status200OK);

        PopulateResponseFields(response, httpContext, options);

        return response;
    }

    /// <summary>
    /// Helper class to encapsulate response options
    /// </summary>
    private sealed class ResponseOptions(
        int statusCode,
        string? type = null,
        string? title = null,
        string? detail = null
    )
    {
        public int StatusCode { get; } = statusCode;
        public string? Type { get; } = type;
        public string? Title { get; } = title;
        public string? Detail { get; } = detail;
    }
}
