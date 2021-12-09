import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

import AppError from "../../errors/AppError";

class CreateUserService {
  async execute(userData) {
    const checkUserExists = await prismaClient.usuario.findFirst({
      where: { email: userData.email },
    });

    if (checkUserExists) {
      throw new AppError("email address already used", 400);
    }

    const hashedPassword = await hash(userData.senha, 8);

    const user = await prismaClient.usuario.create({
      data: {
        nome: userData.nome,
        sobrenome: userData.sobrenome,
        celular: userData.celular,
        email: userData.email,
        senha: hashedPassword,
        id_tipo_usuario: 3,
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

export { CreateUserService };
