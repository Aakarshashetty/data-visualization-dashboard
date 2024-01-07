import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
export const users = [
  {
    _id: uuid(),
    firstName: "Lily",
    lastName: "Martin",
    password: "lily123",
    email:"lily@gmail.com",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  }
];
