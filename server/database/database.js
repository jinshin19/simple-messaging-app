import mysql2 from "mysql2/promise";

const mysqlPool = mysql2.createPool({
  user: process.env.SIMPLE_MESSAGING_APP_DATABASE_USER,
  password: process.env.SIMPLE_MESSAGING_APP_DATABASE_PASSWORD,
  host: process.env.SIMPLE_MESSAGING_APP_DATABASE_HOST,
  database: process.env.SIMPLE_MESSAGING_APP_DATABASE_NAME,
});

export const database = async (script, values) => {
  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const [result, _] = await connection.query(script, values);
    return result;
  } catch (error) {
    console.log("Error found:", {
      file_path: "database.js",
      message: error,
    });
    throw new Error(error);
  } finally {
    await connection.release();
  }
};
