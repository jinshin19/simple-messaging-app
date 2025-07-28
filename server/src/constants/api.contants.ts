export const API = {
  GET: {
    SUCCESS: {
      CODE: 200,
      MESSAGE: "Data fetched successfully",
    },
    ERROR: {
      CODE: 400,
      MESSAGE: "Failed to fetch data",
    },
  },
  POST: {
    SUCCESS: {
      CODE: 201,
      MESSAGE: "Data created successfully",
    },
    ERROR: {
      CODE: 400,
      MESSAGE: "Failed to create data",
    },
  },
  PUT: {
    SUCCESS: {
      CODE: 201,
      MESSAGE: "Data updated successfully",
    },
    ERROR: {
      CODE: 400,
      MESSAGE: "Failed to update data",
    },
  },
  DELETE: {
    SUCCESS: {
      CODE: 201,
      MESSAGE: "Data deleted successfully",
    },
    ERROR: {
      CODE: 400,
      MESSAGE: "Failed to delete data",
    },
  },
  AUTHORIZED: {
    CODE: 200,
    MESSAGE: "Authorized",
  },
  UNAUTHORIZED: {
    CODE: 401,
    MESSAGE: "Unauthorized",
  },
  SIGNUP: {
    CODE: 201,
    MESSAGE: "Sign up successfully",
  },
  SIGNIN: {
    CODE: 200,
    MESSAGE: "Sign in successfully",
  },
  SOMETHINGWENTWRONG: {
    CODE: 400,
    MESSAGE: "Something went wrong",
  },
  OK: {
    CODE: 200,
    MESSAGE: "OK",
  },
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: "Not found",
  },
};
