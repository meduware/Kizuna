export enum statusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum toastMessages {
  MISSING_API = "Api is not defined!",
  USER_NOT_FOUND = "User not found!",
  PASSWORD_INCORRECT = "Password is incorrect!",
  USER_EXISTS = "User already exists!",
  USER_CREATED = "User created successfully!",
  USER_DELETED = "User deleted successfully!",
  NO_COOKIE = "No cookie found!",
}
