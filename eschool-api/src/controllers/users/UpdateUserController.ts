import { Request, Response } from "express";

import { UpdateUserService } from "../../services/users";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { id, nome, sobrenome, celular, idTipoUsuario } = req.body;
    const userId = req.id_usuario;

    const service = new UpdateUserService();

    const result = await service.execute(
      {
        id,
        nome,
        sobrenome,
        celular,
        idTipoUsuario,
      },
      Number(userId)
    );

    return res
      .status(200)
      .json({ status: "success", message: "", data: result });
  }
}

export { UpdateUserController };
