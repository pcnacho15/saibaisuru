"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Categoria } from "@/interfaces/Category";

const categorySchema = z.object({
  id: z.string().uuid().optional().nullable(),
  nombre: z.string().min(3).max(255),
});

export const createUpdateCategory = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const categoryParsed = categorySchema.safeParse(data);

  console.log(data)

  if (!categoryParsed.success) {
    console.log(categoryParsed.error);
    return { ok: false };
  }

  const category = categoryParsed.data;
  
  category.nombre = category.nombre.toLowerCase().replace(/ /g, "-").trim();

  const { id, nombre } = category;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let categoryBD: Categoria;
      if (id) {
        // Actualizar
        categoryBD = await tx.categorias.update({
          where: { id },
          data: {
            nombre,
          },
        });
      } else {
        // Crear
        categoryBD = await tx.categorias.create({
          data: {
            nombre,
          },
        });
      }

      return {
        categoryBD,
      };
    });

    // Todo: RevalidatePaths
    revalidatePath("/admin/categories");
    revalidatePath(`/admin/category/${category.nombre}`);
    revalidatePath(`/categories`);

    return {
      ok: true,
      cateogry: prismaTx.categoryBD,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Revisar los logs, no se pudo actualizar/crear",
    };
  }
};
