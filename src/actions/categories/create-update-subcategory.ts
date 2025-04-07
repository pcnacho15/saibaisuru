"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Categoria } from "@/interfaces/Category";

const subCategorySchema = z.object({
  id: z.string().uuid().optional().nullable(),
  categorias_id: z.string().uuid(),
  nombre: z.string().min(3).max(255),
});

export const createUpdateSubCategory = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const subCategoryParsed = subCategorySchema.safeParse(data);

  console.log(data)

  if (!subCategoryParsed.success) {
    console.log(subCategoryParsed.error);
    return { ok: false };
  }

  const subCategory = subCategoryParsed.data;
  
  subCategory.nombre = subCategory.nombre
    .toLowerCase()
    .replace(/ /g, "-")
    .trim();

  const { id, categorias_id, nombre } = subCategory;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let subCategoryBD: Categoria;
      if (id) {
        // Actualizar
        subCategoryBD = await tx.sub_cagegorias.update({
          where: { id },
          data: {
            categorias_id,
            nombre,
          },
        });
      } else {
        // Crear
        subCategoryBD = await tx.sub_cagegorias.create({
          data: {
            categorias_id,
            nombre,
          },
        });
      }

      return {
        subCategoryBD,
      };
    });

    // Todo: RevalidatePaths
    revalidatePath("/admin/subcategories");
    revalidatePath(`/admin/subcategory/${prismaTx.subCategoryBD.id}`);
    revalidatePath(`/categories`);

    return {
      ok: true,
      subCateogry: prismaTx.subCategoryBD,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Revisar los logs, no se pudo actualizar/crear",
    };
  }
};
