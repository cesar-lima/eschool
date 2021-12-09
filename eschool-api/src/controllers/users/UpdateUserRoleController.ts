import { Request, Response } from "express";

import { UpdateUserRoleService } from "../../services/users";

class UpdateUserRoleController {
  async handle(req: Request, res: Response) {
    const { userId, role } = req.params;
    const id_usuario = req.id_usuario;

    const service = new UpdateUserRoleService();

    try {
      const result = await service.execute(Number(id_usuario), Number(userId), role);

      return res
        .status(204)
        .json({ status: "success", message: "", data: result });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "error", message: error.message, data: "" });
    }
  }
}

export { UpdateUserRoleController };