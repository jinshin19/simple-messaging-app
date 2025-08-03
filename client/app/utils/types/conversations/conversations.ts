export interface ConversationsI {
  message_id: number;
  sender_id: string;
  sender_name: string;
  sender_picture: string | null;
  receiver_id: string;
  receiver_name: string;
  receiver_picture: string | null;
  message: string;
  sent_time: string;
}
