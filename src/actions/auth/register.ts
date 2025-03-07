'use server';

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";


export const registerUser = async( email: string, password: string ) => {

    try {
        
        const registerUser = await prisma.usuarios.create({
          data: {
            // name,
            email,
            clave: bcryptjs.hashSync( password ),
          },
          select: {
            id: true,
            // name: true,
            email: true,
          },
        });

        return {
            ok: true,
            user: registerUser,
            message: 'Usuario creado correctamente',
        }

    } catch (error) {
        console.log(error);
        return {
          ok: false,
          message: "Lo sentimos, no se ha podido crear el usuario",
        };
    }

}