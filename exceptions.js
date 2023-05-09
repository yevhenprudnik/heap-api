export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequest(message = 'Bad Request') {
    return new ApiError(400, message);
  }

  static Unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static Forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static NotFound(message = 'Not Found') {
    return new ApiError(404, message);
  }

  static MethodNotAllowed(message = 'Method Not Allowed') {
    return new ApiError(405, message);
  }

  static Conflict(message = 'Conflict') {
    return new ApiError(409, message);
  }

  static InternalServerError(message = 'Internal Server Error') {
    return new ApiError(500, message);
  }
}
