import prismaClient from "../../prisma";

import AppError from "../../errors/AppError";

class UpdateUserRoleService {
  async execute(userIdAdmin: number, userId: number, role: string) {
    const checkUserIsAdmin = await prismaClient.usuario.findFirst({
      where: { id: userIdAdmin, id_tipo_usuario: 1 },
    });

    if (!checkUserIsAdmin) {
      throw new AppError("action unauthorized", 401);
    }

    let user;

    if(role === "admin") {
        user = await prismaClient.usuario.update({
            where: { id: userId },
            data: { id_tipo_usuario: 1 }
        })
    }

    if(role === "editor") {
        user = await prismaClient.usuario.update({
            where: { id: userId },
            data: { id_tipo_usuario: 2 }
        })
    }

    if(role === "visitante") {
        user = await prismaClient.usuario.update({
            where: { id: userId },
            data: { id_tipo_usuario: 3 }
        })
    }

    return user;
  }
}

export { UpdateUserRoleService };