import { Request, Response } from "express";
import threadServis from "../services/threadServis";

export default new (class ThreadController {
  async getTheadAll(req: Request, res: Response) {
    try {
      const response = await threadServis.getThreadAll(req.query.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(error.status).json({ massage: error.massage });
    }
  }

  async getTheadOne(req: Request, res: Response) {
    try {
      const response = await threadServis.getThreadOne(
        req.params,
        req.query.id
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: "internal server error" });
    }
  }

  async createThread(req: Request, res: Response) {
    try {
      let data;
      const loginSession = res.locals.session.id;
      if (!req.file) {
        data = {
          content: req.body.content,
          author: loginSession,
        };
      } else if (!req.body.content) {
        data = {
          image: req.file.filename,
          author: loginSession,
        };
      } else {
        data = {
          content: req.body.content,
          image: req.file.filename,
          author: loginSession,
        };
      }
      const response = await threadServis.createThread(data);
      res.status(201).json(response);
    } catch (error) {
      res.status(error.status).json(error.massage);
    }
  }
  async updateThread(req: Request, res: Response) {
    try {
      let data;

      if (!req.file) {
        data = {
          content: req.body.content,
        };
      } else {
        data = {
          content: req.body.content,
          image: req.file.filename,
        };
      }
      const response = await threadServis.updateThread(
        req.params,
        data,
        res.locals.session.id
      );

      res.status(200).json(response);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }

  async deleteThead(req: Request, res: Response) {
    try {
      const response = await threadServis.deleteThread(
        req.params,
        res.locals.session.id
      );
      res.status(200).json();
    } catch (error) {
      res.status(error.status).json({ massage: error.massage });
    }
  }
})();
