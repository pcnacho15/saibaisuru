"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como admin",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";

    const user = await prisma.usuarios.update({
      where: {
        id: userId,
      },
      data: {
        rol: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
      user
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar el role, revisar logs",
    };
  }
};
