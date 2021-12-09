import { Request, Response } from "express";

import { CreateCooperationService } from "../../services/cooperation";

class CreateCooperationController {
  async handle(req: Request, res: Response) {
    const { texto } = req.body;
    const id_usuario = req.id_usuario;

    const service = new CreateCooperationService();

    try {
      const result = await service.execute(texto, Number(id_usuario));

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

export { CreateCooperationController };
