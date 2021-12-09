import prismaClient from "../../prisma";

import AppError from "../../errors/AppError";

class CreateNewsService {
  async execute(newsData: any, id_usuario: number) {
    const user = await prismaClient.usuario.findFirst({
      where: { id: id_usuario, id_tipo_usuario: 2 },
    });

    if (!user) {
      throw new AppError("action unauthorized", 401);
    }

    const news = await prismaClient.noticia.create({
      data: {
        titulo: newsData.titulo,
        subtitulo: newsData.subtitulo,
        texto: newsData.texto,
        imagem: newsData.imagem,
        id_categoria: newsData.id_categoria,
        id_usuario_editor: id_usuario,
      },
    });

    return news;
  }
}

export { CreateNewsService };
