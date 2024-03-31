import { Request, Response } from "express";
import userServis from "../services/userServis";
import { log } from "console";

export default new (class UserController {
  // async getUsers(req: Request, res: Response) {
  // }

  async getUsers(req: Request, res: Response) {
    try {
      const id = res.locals.session.id;
      const response = await userServis.getUsers(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: error.massage });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const response = await userServis.getUserId(req.params.id);
      console.log("response", response);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: "Internal Server Error" });
    }
  }

  async getCurrent(req: Request, res: Response) {
    try {
      const response = await userServis.getCurrenUser(res.locals.session.id);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: "Internal server error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const response = await userServis.updateUser(
        parseInt(req.params.id),
        res.locals.session.id,
        req.body
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: error.massage });
    }
  }

  async updatePicture(req: Request, res: Response) {
    try {
      console.log("picture", req.file.filename);
      const response = await userServis.uploadPicture(
        parseInt(req.params.id),
        res.locals.session.id,
        req.file.filename
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: error.massage });
    }
  }

  async updateCover_photo(req: Request, res: Response) {
    try {
      const response = await userServis.uploadCover(
        parseInt(req.params.id),
        res.locals.session.id,
        req.file.filename
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: error.massage });
    }
  }
  // async deleteUser(req: Request, res: Response) {
  //   try {
  //     const response = await userServis.deleteUser(
  //       parseInt(req.params.id),
  //       res.locals.session.id,
  //       req.body.password
  //     );
  //     res.status(200).json(response);
  //   } catch (error) {
  //     res.status(error.status).json({ message: error.message });
  //   }
  // }
})();
