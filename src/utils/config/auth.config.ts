import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials) return null;

        const email = parsedCredentials.data!.email;
        const password = parsedCredentials.data!.password;

        //* Buscar correo
        const user = await prisma.usuarios.findUnique({
          where: { email: email?.toLocaleLowerCase() },
        });
        if (!user) return null;

        //* Comparar contraseñas
        if (!bcrypt.compareSync(password, user.clave)) return null;

        //* Regresar el usuario encontrado

        const { clave, ...rest } = user;

        console.log(rest)

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
