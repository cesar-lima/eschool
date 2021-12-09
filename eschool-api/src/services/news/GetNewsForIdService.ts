import prismaClient from "../../prisma";

class GetNewsForIdService {
  async execute(newsId: number) {
    const news = await prismaClient.noticia.findFirst({
      where: {
        id: newsId,
      },
      include: {
        categoria: true,
        editor: {
          select: {
            nome: true,
            sobrenome: true,
            email: true,
          },
        },
        comentarios: {
          where: {
            visitante: {
              ativo: true,
            },
          },
          select: {
            texto: true,
            data_criacao: true,
            visitante: {
              select: {
                nome: true,
                sobrenome: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return news;
  }
}

export { GetNewsForIdService };
