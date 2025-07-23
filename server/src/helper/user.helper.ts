import { database } from "../database/database";

export const getCurrentUser = async (user_id: string) => {
  if (!user_id) {
    return null;
  }
  const user = await database(
    "select users.refresh_token from users where user_id = ?",
    user_id
  );
  return user[0] ?? null;
};
