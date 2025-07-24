import { apiMiddleware } from "../middleware/apiMiddleware";

export const getConversations = async (): Promise<Response> => {
  const url = "/conversations";
  const options = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};

export const getConversation = async (user_id: string) => {
  const url = `/conversations/${user_id}`;
  const options = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};

export const createConversation = async (user_id: string, message: string) => {
  const url = "/conversations";
  const data = {
    receiver_id: user_id,
    message,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
  };
  return await apiMiddleware({ url, options });
};
