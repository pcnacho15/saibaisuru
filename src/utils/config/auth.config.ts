import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider !== "credentials") {
        if (user) {
          //* Validar correo en base de datos
          const emailUser = await prisma.usuarios.findUnique({
            where: { email: user.email! },
          });

          if (!emailUser) {
            //* Crear usuario
            try {
              const { clave, ...rest } = await prisma.usuarios.create({
                data: {
                  email: user.email!,
                  email_confirmado: profile?.email_verified || false,
                  clave: "",
                  image: user.image,
                  tipo_login: account?.provider,
                },
              });
              user.id = rest.id;
              token.data = user;
              return token;
            } catch (error) {
              console.error("Error al crear usuario", error);
            }
          }

          user.id = emailUser?.id;
          token.data = user;
          return token;
        }
      }

      if (user) {
        token.data = user;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log(token.data);
      session.user = token.data as any;
      return session;
    },
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

        return rest;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
