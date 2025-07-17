export const JWT = {
  NORMALIZE: {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
  },
  TYPE: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
  },
  STATUS: {
    SUCCESS: "success",
    ERROR: "error",
  },
  EXPIRESIN: {
    ACCESS_TOKEN_EXPIRATION: "10m",
    REFRESH_TOKEN_EXPIRATION: "30m",
  },
  COMMON: {
    NO_TOKENS: "No tokens found",
  },
};

export const DATABASE = {
  ERRORS: [
    {
      CODE: "ER_DUP_ENTRY",
      ERRNO: 1062,
      MESSAGE: "Duplicate entry for unique key",
    },
    {
      CODE: "ER_NO_SUCH_TABLE",
      ERRNO: 1146,
      MESSAGE: "Table doesn't exist",
    },
    {
      CODE: "ER_PARSE_ERROR",
      ERRNO: 1064,
      MESSAGE: "SQL syntax error",
    },
    {
      CODE: "ER_BAD_FIELD_ERROR",
      ERRNO: 1054,
      MESSAGE: "Unknown column in field list",
    },
    {
      CODE: "ER_ROW_IS_REFERENCED_2",
      ERRNO: 1451,
      MESSAGE: "Cannot delete or update due to foreign key constraint",
    },
    {
      CODE: "ER_NO_REFERENCED_ROW_2",
      ERRNO: 1452,
      MESSAGE: "Cannot insert/update due to missing foreign key",
    },
    {
      CODE: "ER_ACCESS_DENIED_ERROR",
      ERRNO: 1045,
      MESSAGE: "Access denied for user",
    },
    {
      CODE: "ER_DBACCESS_DENIED_ERROR",
      ERRNO: 1044,
      MESSAGE: "Database access denied",
    },
    {
      CODE: "ER_BAD_DB_ERROR",
      ERRNO: 1049,
      MESSAGE: "Unknown database",
    },
    {
      CODE: "PROTOCOL_CONNECTION_LOST",
      ERRNO: -1,
      MESSAGE: "Connection lost unexpectedly",
    },
    {
      CODE: "ECONNREFUSED",
      ERRNO: -111,
      MESSAGE: "Connection refused by server",
    },
    {
      CODE: "ER_LOCK_WAIT_TIMEOUT",
      ERRNO: 1205,
      MESSAGE: "Transaction timeout (lock wait)",
    },
    {
      CODE: "ER_LOCK_DEADLOCK",
      ERRNO: 1213,
      MESSAGE: "Deadlock detected in transaction",
    },
    {
      CODE: "ER_TRUNCATED_WRONG_VALUE",
      ERRNO: 1366,
      MESSAGE: "Incorrect value for column",
    },
    {
      CODE: "ER_DATA_TOO_LONG",
      ERRNO: 1406,
      MESSAGE: "Data too long for column",
    },
    {
      CODE: "ER_BAD_NULL_ERROR",
      ERRNO: 1048,
      MESSAGE: "Column cannot be null",
    },
    {
      CODE: "ER_TABLE_EXISTS_ERROR",
      ERRNO: 1050,
      MESSAGE: "Table already exists",
    },
  ],
};
