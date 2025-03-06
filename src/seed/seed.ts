
import bcryptjs from "bcryptjs";

interface SeedUser {
  email: string;
  clave: string;
  rol: "admin" | "user";
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "nacho@google.com",
      clave: bcryptjs.hashSync("123456"),
      rol: "admin",
    },
    {
      email: "tom@google.com",
      clave: bcryptjs.hashSync("123456"),
      rol: "user",
    },
  ],
};