import { Repository } from "typeorm";
import { Reply } from "../entity/Reply";
import { AppDataSource } from "../data-source";
import { validate } from "../utils/Validator/validete";
import { replyThreadSchema } from "../utils/Validator/reply";
import cloudinary from "../libs/cloudinary";
import ResponsError from "../error/responsError";
import likeService from "./likeService";

export default new (class ReplyService {
  private readonly replyRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);

  async getReplyThread(threadId, userId) {
    const response = await this.replyRepository
      .createQueryBuilder("reply")
      .leftJoinAndSelect("reply.author", "author")
      .leftJoinAndSelect("reply.like", "like")
      .leftJoinAndSelect("reply.replies", "replies")
      .where("reply.thread = :thread", { thread: threadId })
      .getMany();
    const likes = response.map(
      async (val) => await likeService.getLikeReply(val.id, userId)
    );
    const replies = [];
    let i = 0;
    const leng = response.length;
    for (i; i < leng; i++) {
      replies.push({
        id: response[i].id,
        content: response[i].content,
        image: response[i].image,
        likes: response[i].like.length,
        isLiked: await response[i],
        replies: response[i].replies.length,
        author: response[i].author,
        created_at: response[i].created_at,
      });
    }
    return await Promise.all(replies);
  }

  async replyThread(data) {
    const isValid = validate(replyThreadSchema, data);
    let valid;

    if (data.image && data.content) {
      cloudinary.upload();
      const upFile = await cloudinary.destination(isValid.image);
      valid = {
        content: isValid.content,
        image: upFile.secure_url,
        author: isValid.author,
        thread: isValid.thread,
      };
    } else if (!data.image && data.content) {
      valid = {
        content: isValid.content,
        author: isValid.author,
        thread: isValid.thread,
      };
    } else if (data.image && !data.content) {
      valid = {
        image: isValid.image,
        author: isValid.author,
        thread: isValid.thread,
      };
    } else {
      throw new ResponsError(400, "Content or Image is required");
    }
    await this.replyRepository.save(valid);
    return {
      massage: "reply success",
      data: valid,
    };
  }
  async deleteReply(id, session) {
    const chkReply = await this.replyRepository.findOne({
      where: { id },
      relations: { author: true },
    });
    if (!chkReply) throw new ResponsError(404, "reply not found!");

    if (session !== chkReply.author.id)
      throw new ResponsError(403, "you not author!");

    await this.replyRepository.delete(id);
    return {
      massage: "Reply deleted",
    };
  }
})();
