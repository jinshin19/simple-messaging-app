export const SCRIPTS = {
  USER: {
    GET_USER_BY_EMAIL_AND_VERIFIED:
      "select * from users where email = ? and is_verified = ?",
    UPDATE_USER_REFRESH_TOKEN:
      "update users set refresh_token = ? where user_id = ?",
    SIGN_UP_USER:
      "insert into users (user_id, given_name, family_name, picture, email, is_verified, refresh_token) values (?, ?, ?, ?, ?, ?, ?)",
    GET_USERS: "select user_id, given_name, family_name, picture from users",
  },
  MESSAGE: {
    GET_ALL_MESSAGES: "select * from messages",
    GET_ONE_ON_ONE_CONVERSATION: `
            select
             messages.id as message_id,
             messages.sender_id as sender_id,
             messages.receiver_id as receiver_id,
             sender.given_name as sender_name,
             receiver.given_name as receiver_name,
             messages.message as message,
             messages.createdAt as sent_time
            from messages 
            join users sender on messages.sender_id = sender.user_id
            join users receiver on messages.receiver_id = receiver.user_id 
            where (messages.sender_id = ? and messages.receiver_id = ?) 
            or (messages.sender_id = ? and messages.receiver_id = ?)
        `,
    SEND_MESSAGE: `
            insert into messages (sender_id, receiver_id, message)
            values (?, ?, ?)
        `,
  },
};
