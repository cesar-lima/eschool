import prismaClient from "../../prisma";

class CreateCooperationService {
  async execute(texto: string, id_usuario: number) {
    const cooperation = await prismaClient.cooperacao.create({
      data: {
        texto,
        id_usuario_visitante: id_usuario,
      },
    });

    return cooperation;
  }
}

export { CreateCooperationService };
