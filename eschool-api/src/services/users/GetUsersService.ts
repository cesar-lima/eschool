import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

import AppError from "../../errors/AppError";

class GetUsersService {
  async execute(id_usuario: number) {
    const checkIsAdmin = await prismaClient.usuario.findFirst({
      where: { id: id_usuario, id_tipo_usuario: 1 },
    });

    if (!checkIsAdmin) {
      throw new AppError("unauthorized action", 401);
    }

    const users = await prismaClient.usuario.findMany({
      where: {NOT: {id: id_usuario}},
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        celular: true,
        email: true,
        id_tipo_usuario: true,
        tipo_usuario: true,
      },
    });

    return users;
  }
}

export { GetUsersService };
