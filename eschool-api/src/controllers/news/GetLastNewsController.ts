import { Request, Response } from "express";

import { GetLastNewsService } from "../../services/news";

class GetLastMessagesController {
  async handle(req: Request, res: Response) {
    const service = new GetLastNewsService();

    try {
      const result = await service.execute();

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

export { GetLastMessagesController };
