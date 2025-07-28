import { apiMiddleware } from "../middleware/apiMiddleware";

export const getUsers = async (): Promise<Response> => {
  const url = "/users";
  const options: RequestInit = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};

export const getUser = async (user_id: string): Promise<Response> => {
  const url = `/users/${user_id}`;
  const options: RequestInit = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};
