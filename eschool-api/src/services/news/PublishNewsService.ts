import prismaClient from "../../prisma";

import AppError from "../../errors/AppError";

class PublishNewsService {
  async execute(newsId: number, id_usuario: number) {
    const checkNewsEditor = await prismaClient.noticia.findFirst({
      where: { id: newsId, id_usuario_editor: id_usuario },
    });

    if (!checkNewsEditor) {
      throw new AppError("action unauthorized", 401);
    }

    const news = await prismaClient.noticia.update({
      where: { id: newsId },
      data: { rascunho: false },
    });

    return news;
  }
}

export { PublishNewsService };
