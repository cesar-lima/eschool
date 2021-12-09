import prismaClient from "../../prisma";

class GetNewsForEditorService {
  async execute(userId: number) {
    const news = await prismaClient.noticia.findMany({
        where: {
            id_usuario_editor: userId
        },
        include: {
          categoria: true,
        }   
    });

    return news;
  }
}

export { GetNewsForEditorService };
