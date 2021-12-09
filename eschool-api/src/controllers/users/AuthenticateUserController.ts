import { Request, Response } from "express";

import { AuthenticateUserService } from "../../services/users";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, senha } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute(email, senha);

    return res.status(201).json({ user, token });
  }
}

export { AuthenticateUserController };
