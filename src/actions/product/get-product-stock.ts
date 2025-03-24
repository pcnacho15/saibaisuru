"use server";

import prisma from "@/lib/prisma";
// import { sleep } from '@/utils';

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    // await sleep(3);

    const stock = await prisma.productos.findFirst({
      where: { slug },
      select: { cantidad: true },
    });

    return stock?.cantidad ?? 0;
  } catch (error) {
    return 0;
  }
};
