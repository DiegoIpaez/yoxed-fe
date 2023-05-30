export const USER_HTTP_ERRORS = {
  INVALID_CREDENTIALS: {
    code: 401,
    message: "Invalid password or email.",
  },
  USER_NOT_FOUND: {
    code: 404,
    message: "User not found",
  },
  USER_ALREADY_EXISTS: {
    code: 409,
    message: "This user already exists",
  },
};
