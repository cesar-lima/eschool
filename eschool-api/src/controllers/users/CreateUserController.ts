import { Request, Response } from "express";

import { CreateUserService } from "../../services/users";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { nome, sobrenome, celular, email, senha } = req.body;

    const service = new CreateUserService();

    try {
      const result = await service.execute({
        nome,
        sobrenome,
        celular,
        email,
        senha,
      });

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

export { CreateUserController };
