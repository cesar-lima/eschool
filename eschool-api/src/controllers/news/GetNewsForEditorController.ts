import { Request, Response } from "express";

import { GetNewsForEditorService } from "../../services/news";

class GetNewsForEditorController {
  async handle(req: Request, res: Response) {
    const id_usuario = req.id_usuario;

    const service = new GetNewsForEditorService();

    try {
      const result = await service.execute(Number(id_usuario));

      if (!result) {
        return res
          .status(404)
          .json({ status: "error", message: "news not found", data: "" });
      }

      return res.status(200).json({ status: "success", message: "", data: result });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "error", message: error.message, data: "" });
    }
  }
}

export { GetNewsForEditorController };
