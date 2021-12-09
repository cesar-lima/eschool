import { Request, Response } from "express";

import { PublishNewsService } from "../../services/news";

class PublishNewsController {
  async handle(req: Request, res: Response) {
    const { newsId } = req.params;
    const id_usuario = req.id_usuario;

    const service = new PublishNewsService();

    try {
      const result = await service.execute(Number(newsId), Number(id_usuario));

      if (!result) {
        return res
          .status(404)
          .json({ status: "error", message: "news not found", data: "" });
      }

      return res.status(204).json({ status: "success", message: "", data: "" });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "error", message: error.message, data: "" });
    }
  }
}

export { PublishNewsController };
