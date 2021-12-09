import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

import AppError from "../../errors/AppError";

class AuthenticateUserService {
  async execute(email: string, senha: string) {
    const user = await prismaClient.usuario.findFirst({
      where: { email, ativo: true },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        celular: true,
        email: true,
        senha: true,
        tipo_usuario: true,
      },
    });

    if (!user) {
      throw new AppError("incorrecet email/password combination", 401);
    }

    const passwordMatched = await compare(senha, user.senha);

    if (!passwordMatched) {
      throw new AppError("incorrecet email/password combination", 401);
    }

    const token = sign({}, process.env.JWT_SECRET || "", {
      subject: user.id.toString(),
      expiresIn: "1d",
    });

    // @ts-ignore
    delete user.senha;
    delete user.id;

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
