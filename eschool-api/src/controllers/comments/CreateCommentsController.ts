import { Request, Response } from "express";

import { CreateCommentsService } from "../../services/comments";

class CreateCommentsController {
  async handle(req: Request, res: Response) {
    const { texto } = req.body;
    const { newsId } = req.params;
    const id_usuario = req.id_usuario;

    const service = new CreateCommentsService();

    try {
      const result = await service.execute(
        texto,
        Number(newsId),
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

export { CreateCommentsController };
