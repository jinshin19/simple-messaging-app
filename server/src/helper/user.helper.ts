import { database } from "../database/database";

export const getCurrentUserRefreshToken = async (user_id: string) => {
  if (!user_id) {
    return null;
  }
  const user = await database(
    "select users.refresh_token from users where user_id = ?",
    user_id
  );
  return user[0]?.refresh_token ?? null;
};

export const updateUserStatus = async (
  user_id: string,
  online: boolean = false
): Promise<boolean> => {
  if (!user_id) {
    return false;
  }
  const user = await database(
    "update users set users.isOnline = ? where user_id = ?",
    [online, user_id]
  );
  if (user?.affectedRows > 0) {
    return true;
  }
  return false;
};
