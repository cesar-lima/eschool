import { Request, Response } from "express";

import { GetNewsForCategService } from "../../services/news";

class GetNewsForCategController {
  async handle(req: Request, res: Response) {
    const { category } = req.params;

    const service = new GetNewsForCategService();

    try {
      const result = await service.execute(category as string);

      return res
        .status(200)
        .json({ status: "success", message: "", data: result });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "error", message: error.message, data: "" });
    }
  }
}

export { GetNewsForCategController };
