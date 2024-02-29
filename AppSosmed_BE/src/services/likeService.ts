import { Repository } from "typeorm";
import { Like } from "../entity/Like";
import { AppDataSource } from "../data-source";

export default new (class LikeService {
  private readonly likeRepo: Repository<Like> =
    AppDataSource.getRepository(Like);

  async likeThread(threadId, sessionId) {
    const response = await this.likeRepo.save({
      thread: threadId,
      author: sessionId,
    });
    return {
      message: "Thread Liked",
    };
  }

  async likeReply(replyId, sessionId) {
    this.likeRepo.save({
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

    await this.likeRepo.delete(getLike.id);
    return {
      message: "Unliked",
    };
  }
})();
