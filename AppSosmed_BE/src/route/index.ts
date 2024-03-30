import { Router } from "express";
import authController from "../controllers/authController";
import AuthMiddleware from "../middlewares/auth";
import * as multer from "multer";
import userController from "../controllers/userController";
import uploadFile from "../middlewares/uploadFile";
import threadController from "../controllers/threadController";
import followersController from "../controllers/followersController";
import replyController from "../controllers/replyController";
import likeService from "../services/likeService";
import likesController from "../controllers/likesController";

const routes = Router();
const upload = multer();

// user api
routes.get("/search", AuthMiddleware.auth, userController.getUsers);
routes.get("/user:id", AuthMiddleware.auth, userController.getUser);
routes.get("/user/me/current", AuthMiddleware.auth, userController.getCurrent);
routes.post("/register", upload.none(), authController.register);
routes.post("/login", upload.none(), authController.login);
routes.delete("/logout", authController.logout);

// REPLY API
routes.post(
  "/reply/thread",
  AuthMiddleware.auth,
  uploadFile.upload("image"),
  replyController.replyThead
);
routes.delete("/reply/:id", AuthMiddleware.auth, replyController.deleteReply);

// Thread Api
routes.post(
  "/thread",
  AuthMiddleware.auth,
  uploadFile.upload("image"),
  threadController.createThread
);
routes.get("/thread", threadController.getTheadAll);
routes.get("/thread/:id", threadController.getTheadOne);
// routes.patch(
//   "/thread/:id",
//   AuthMiddleware.auth,
//   uploadFile.upload("image"),
//   threadController.updateThread
// );
routes.delete("/thread/:id", AuthMiddleware.auth, threadController.deleteThead);

// Follow Api
routes.post("/follow", AuthMiddleware.auth, followersController.follow);
routes.delete("/unfollow", AuthMiddleware.auth, followersController.unfollow);
routes.get("/follow/:id", followersController.getFollower);

// Like API
routes.post("/like/thread", AuthMiddleware.auth, likesController.likeThread);
routes.post("/like/reply", AuthMiddleware.auth, likesController.likeReply);
routes.delete(
  "/unlike/thread",
  AuthMiddleware.auth,
  likesController.unlikeThread
);
routes.delete(
  "/unlike/reply",
  AuthMiddleware.auth,
  likesController.unlikeReply
);

// routes.post("/thread/:threadId/like", AuthMiddleware.auth, likesController.createLikeThread);

export default routes;
