export const MESSAGES_SCRIPT = {
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
             messages.created_at as sent_time
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
