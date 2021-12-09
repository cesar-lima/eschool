import prismaClient from "../../prisma";

import AppError from "../../errors/AppError";

class UpdateUserService {
  async execute(userData, userId) {
    const checkUserIsAdmin = await prismaClient.usuario.findFirst({
      where: { id: userId, id_tipo_usuario: 1 },
    });

    if (!checkUserIsAdmin) {
      throw new AppError("action unauthorized", 401);
    }

    const user = await prismaClient.usuario.update({
      where: { id: userData.id },
      data: {
        nome: userData.nome,
        sobrenome: userData.sobrenome,
        email: userData.email,
        celular: userData.celular,
        id_tipo_usuario: userData.idTipoUsuario,
        data_atualizacao: new Date(),
      },
      select: {
        nome: true,
        sobrenome: true,
        celular: true,
        email: true,
      },
    });

    return user;
  }
}

export { UpdateUserService };
