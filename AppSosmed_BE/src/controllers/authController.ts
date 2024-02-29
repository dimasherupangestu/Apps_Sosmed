import { Request, Response } from "express";
import authService from "../services/authService";

export default new (class AuthController {
  async register(req: Request, res: Response) {
    try {
      const response = await authService.register(req.body);
      return res
        .status(201)
        .cookie("token", response.token, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 3 * 24 * 60 * 60 * 1000,
        })
        .json(response);
    } catch (error) {
      res.status(error.status).json({ massage: error.massage });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const response = await authService.login(req.body);
      return res
        .status(200)
        .cookie("token", response.token, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 3 * 24 * 60 * 60 * 1000,
        })
        .json(response);
    } catch (error) {
      res.status(error.status).json({ massage: error.massage });
    }
  }
  async logout(req: Request, res: Response) {
    try {
      return res
        .status(200)
        .clearCookie("token")
        .json({ massage: "Logout success" });
    } catch (error) {
      return res.status(500).json({ massage: "internal server error" });
    }
  }
})();
