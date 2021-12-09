import { Request, Response } from "express";

import { GetUsersService } from "../../services/users";

class GetUsersController {
  async handle(req: Request, res: Response) {
    const id_usuario = req.id_usuario;

    const service = new GetUsersService();

    try {
      const result = await service.execute(Number(id_usuario));

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

export { GetUsersController };
