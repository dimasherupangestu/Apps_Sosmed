import { Request, Response } from "express";
import followService from "../services/followService";

export default new (class FollowController {
  async getFollower(req: Request, res: Response) {
    try {
      const response = await followService.getFollow(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: error });
    }
  }

  async follow(req: Request, res: Response) {
    try {
      const response = await followService.follow(
        req.body.following,
        res.locals.session.id
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ massage: error.message });
    }
  }

  async unfollow(req: Request, res: Response) {
    try {
      const response = await followService.unfollow(
        req.query.following,
        res.locals.session.id
      );

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ massage: "internal server error" });
    }
  }
})();
