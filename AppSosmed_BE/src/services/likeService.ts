import { Equal, Repository } from "typeorm";
import { Like } from "../entity/Like";
import { AppDataSource } from "../data-source";
import ResponsError from "../error/responsError";
import { Request, Response } from "express";
import { createLikeThread } from "../utils/Validator/likeValidator";

export default new (class LikeService {
  private readonly likeRepo: Repository<Like> =
    AppDataSource.getRepository(Like);

  async likeThread(threadId, sessionId) {
    const chk = await this.likeRepo.count({
      where: {
        thread: Equal(threadId),
        author: Equal(sessionId),
      },
    });

    if (chk) throw new ResponsError(400, "You cannot like this Thread twice!");

    await this.likeRepo.save({
      thread: threadId,
      author: sessionId,
    });
    return {
      message: "Thread Liked",
    };
  }
  // async likeThread(req: Request, res: Response) {
  //   const threadId = parseInt(req.params.threadId, 10);
  //   const data = {
  //     threadId: threadId,
  //   };
  //   const { error, value } = createLikeThread.validate(data);
  //   if (error) throw new ResponsError(400, error.message);

  //   const loginSesion = res.locals.session;

  //   const likeSelected = await this.likeRepo.findOne({
  //     where: {
  //       author: { id: loginSesion.id },
  //       thread: { id: value.thread },
  //     },
  //   });

  //   if (likeSelected) {
  //     await this.likeRepo.remove(likeSelected);
  //     return { massage: "Succes remove like!" };
  //   }

  //   const like = this.likeRepo.create({
  //     thread: value.thread,
  //     author: {
  //       id: loginSesion.id,
  //     },
  //   });
  //   const response = await this.likeRepo.save(like);
  //   return {
  //     message: "Success like!",
  //     data: response,
  //   };
  // }

  async likeReply(replyId, sessionId) {
    const chk = await this.likeRepo.count({
      where: {
        reply: Equal(replyId),
        author: Equal(sessionId),
      },
    });
    if (chk) throw new ResponsError(400, "You cannot like this Reply twice!");
    await this.likeRepo.save({
      reply: replyId,
      author: sessionId,
    });
    return {
      message: "Reply's Liked",
    };
  }

  async getLikeThread(threadId, authorId) {
    const chk = await this.likeRepo
      .createQueryBuilder("like")
      .where("like.thread = :thread", { thread: threadId })
      .andWhere("like.author = :author", { author: authorId })
      .getOne();

    if (chk) return true;
    return false;
  }

  async getLikeReply(replyId, authorId) {
    const chk = await this.likeRepo
      .createQueryBuilder("like")
      .where("like.reply = :reply", { reply: replyId })
      .andWhere("like.author = :author", { author: authorId })
      .getOne();

    if (chk) return true;
    return false;
  }

  async unlikeThread(id, session) {
    const getLike = await this.likeRepo
      .createQueryBuilder("like")
      .leftJoinAndSelect("like.thread", "thread")
      .leftJoinAndSelect("like.author", "author")
      .where("like.thread = :thread", { thread: id })
      .andWhere("like.author = :author", { author: session })
      .getOne();
    if (!getLike) throw new ResponsError(404, "You already unlike this Thread");
    await this.likeRepo.delete(getLike.id);

    return {
      message: "Unliked",
    };
  }

  async unlikeReply(id, session) {
    const getLike = await this.likeRepo
      .createQueryBuilder("like")
      .leftJoinAndSelect("like.reply", "reply")
      .leftJoinAndSelect("like.author", "author")
      .where("like.reply = :reply", { reply: id })
      .andWhere("like.author = :author", { author: session })
      .getOne();

    if (!getLike) throw new ResponsError(404, "You already unlike this Reply");

    await this.likeRepo.delete(getLike.id);
    return {
      message: "Unliked",
    };
  }
})();
