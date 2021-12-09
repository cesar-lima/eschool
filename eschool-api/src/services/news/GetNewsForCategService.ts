import prismaClient from "../../prisma";

class GetNewsForCategService {
  async execute(category: string) {
    const news = await prismaClient.noticia.findMany({
      where: {
        categoria: {
          nome_categoria: category,
        },
        rascunho: false,
      },
      orderBy: {
        data_criacao: "desc",
      },
      include: {
        categoria: true,
      },
    });

    return news;
  }
}

export { GetNewsForCategService };
