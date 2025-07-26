import { apiMiddleware } from "../middleware/apiMiddleware";

export const logoutUser = async (): Promise<Response> => {
  const url = "/users/logout";
  const options: RequestInit = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};
