import { apiMiddleware } from "../middleware/apiMiddleware";

export const getConversations = async (): Promise<Response> => {
  const url = "/conversations";
  const options = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};

export const getConversation = async () => {
  const url = `/conversation/${123}`;
  const options = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};
