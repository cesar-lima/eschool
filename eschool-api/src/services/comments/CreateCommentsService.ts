import prismaClient from "../../prisma";

class CreateCommentsService {
  async execute(commentText: string, newsId: number, id_usuario: number) {
    const comment = await prismaClient.comentario.create({
      data: {
        texto: commentText,
        id_noticia: newsId,
        id_usuario_visitante: id_usuario,
      },
      select: {
        texto: true,
        data_criacao: true,
      },
    });

    return comment;
  }
}

export { CreateCommentsService };
