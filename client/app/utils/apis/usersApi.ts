import { apiMiddleware } from "../middleware/apiMiddleware";

export const getUsers = async (): Promise<Response> => {
  const url = "/users";
  const options: RequestInit = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};
