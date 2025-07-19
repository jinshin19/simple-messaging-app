import { v4 as uuid } from "uuid";
export const generateUUID = () => {
  return `SMP-${uuid()}`;
};
