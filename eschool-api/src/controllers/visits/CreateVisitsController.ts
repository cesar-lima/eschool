import { Request, Response } from "express";

import { CreateVisitsService } from "../../services/visits";

class CreateVisitsController {
  async handle(req: Request, res: Response) {
    const { ip_visita } = req.body;
    const { newsId } = req.params;

    const service = new CreateVisitsService();

    try {
      const result = await service.execute(ip_visita, Number(newsId));

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

export { CreateVisitsController };
