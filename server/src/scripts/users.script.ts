export const USERS_SCRIPT = {
  USER: {
    GET_USER_BY_EMAIL_AND_VERIFIED:
      "select * from users where email = ? and is_verified = ?",
    UPDATE_USER_REFRESH_TOKEN:
      "update users set refresh_token = ? where user_id = ?",
    SIGN_UP_USER:
      "insert into users (user_id, given_name, family_name, picture, email, is_verified, refresh_token) values (?, ?, ?, ?, ?, ?, ?)",
    GET_USERS: "select user_id, given_name, family_name, picture from users",
    GET_USER:
      "select user_id, given_name, family_name, picture from users where user_id = ?",
  },
};
