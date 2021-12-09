import { Request, Response } from "express";

import { CreateNewsService } from "../../services/news";

class CreateNewsController {
  async handle(req: Request, res: Response) {
    const { titulo, subtitulo, texto, imagem, id_categoria } = req.body;
    const id_usuario = req.id_usuario;

    const service = new CreateNewsService();

    try {
      const result = await service.execute(
        { titulo, subtitulo, texto, imagem, id_categoria },
        Number(id_usuario)
      );

      return res
        .status(201)
        .json({ status: "success", message: "", data: result });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "error", message: error.message, data: "" });
    }
  }
}

export { CreateNewsController };
