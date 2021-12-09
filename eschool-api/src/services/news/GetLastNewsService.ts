import prismaClient from "../../prisma";

class GetLastNewsService {
  async execute() {
    const news = await prismaClient.noticia.findMany({
      where: { rascunho: false },
      take: 10,
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

export { GetLastNewsService };
