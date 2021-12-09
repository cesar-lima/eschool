import { Request, Response } from "express";

import { GetNewsForIdService } from "../../services/news";

class GetNewsForIdController {
  async handle(req: Request, res: Response) {
    const { newsId } = req.params;

    const service = new GetNewsForIdService();

    try {
      const result = await service.execute(Number(newsId));

      if (!result) {
        return res
          .status(404)
          .json({ status: "error", message: "news not found", data: "" });
      }

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

export { GetNewsForIdController };
