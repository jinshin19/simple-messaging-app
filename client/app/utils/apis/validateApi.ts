import { apiMiddleware } from "../middleware/apiMiddleware";

export const validateAuthorization = async () => {
  const url = "/validate";
  const options = {
    method: "GET",
  };
  return await apiMiddleware({ url, options });
};
