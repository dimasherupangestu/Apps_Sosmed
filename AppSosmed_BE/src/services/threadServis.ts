import { Repository } from "typeorm";
import { Thread } from "../entity/Thread";
import { AppDataSource } from "../data-source";
import {
  createThreadSchema,
  updateThreadSchema,
} from "../utils/Validator/threadService";
import cloudinary from "../libs/cloudinary";
import ResponsError from "../error/responsError";
import { validate } from "../utils/Validator/validete";
import likeService from "./likeService";
import { response } from "express";
import replyService from "./replyService";

export default new (class threadServis {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async getThreadAll(id) {
    const response = await this.threadRepository.find({
      order: {
        id: "DESC",
      },
      relations: {
        author: true,
        like: true,
        replies: true,
      },
      select: {
        author: {
          id: true,
          name: true,
          username: true,
          picture: true,
        },
      },
    });
    const like = response.map(
      async (val) => await likeService.getLikeThread(val.id, id)
    );
    console.log("like", like);

    const thread = [];
    let i = 0;
    const hitung = response.length;
    for (i; i < hitung; i++) {
      thread.push({
        id: response[i].id,
        content: response[i].content,
        image: response[i].image,
        like: response[i].like.length,
        isLike: await like[i],
        replies: response[i].replies.length,
        author: response[i].author,
        created_at: response[i].created_at,
        updated_at: response[i].updated_at,
      });
    }
    return await Promise.all(thread);
  }

  async getThreadOne(id, userId) {
    const response = await this.threadRepository.findOne({
      where: id,
      relations: {
        author: true,
        like: true,
        replies: true,
      },
      select: {
        author: {
          id: true,
          name: true,
          username: true,
          picture: true,
        },
      },
    });
    const like = await likeService.getLikeThread(response.id, userId);
    const replies = await replyService.getReplyThread(response.id, userId);

    return {
      id: response.id,
      content: response.content,
      image: response.image,
      author: response.author,
      likes: response.like,
      islike: like,
      replies,
      created_at: response.created_at,
      updated_at: response.updated_at,
    };
  }
  async createThread(data) {
    const isvalidate = validate(createThreadSchema, data);
    console.log("data", data);

    let valid;

    if (data.image) {
      cloudinary.upload();
      const upFile = await cloudinary.destination(isvalidate.image);
      console.log("ini upfile", upFile);
      valid = {
        content: isvalidate.content,
        image: upFile.secure_url,
        author: isvalidate.author,
      };
    } else {
      valid = {
        content: isvalidate.content,
        author: isvalidate.author,
      };
    }
    console.log("valid nih", valid);

    const response = await this.threadRepository.save(valid);
    return {
      message: "Your Thread is created",
      data: response,
    };
  }

  async updateThread(id, data, session) {
    const chkThread = await this.threadRepository.findOne({
      where: id,
      relations: {
        author: true,
      },
    });
    if (chkThread.author.id !== session)
      throw new ResponsError(403, "You are not the author of this thread");

    const isValid = validate(updateThreadSchema, data);
    let valid;

    if (data.image && data.content) {
      cloudinary.upload();
      const upFIle = await cloudinary.destination(isValid.image);

      valid = {
        content: isValid.content,
        image: upFIle.secure_url,
        updated_at: isValid.updated_at,
      };
    } else if (!data.image && data.content) {
      valid = {
        content: isValid.content,
        updated_at: isValid.updated_at,
      };
    } else if (data.image && !data.content) {
      cloudinary.upload();
      const upFIle = await cloudinary.destination(isValid.image);

      valid = {
        image: upFIle.secure_url,
        updated_at: isValid.updated_at,
      };
    } else {
      throw new ResponsError(400, "Content or Image is required");
    }

    await this.threadRepository.update(id, valid);

    return {
      message: "Thread updated",
      data: valid,
    };
  }

  async deleteThread(id, session) {
    const chkThread = await this.threadRepository.findOne({
      where: id,
      relations: {
        author: true,
      },
    });
    if (!chkThread) throw new ResponsError(400, "thread not found!");

    if (session !== chkThread.author.id)
      throw new ResponsError(400, "you not author!");

    await this.threadRepository.delete(id);
    return {
      massage: "thread deleted success",
    };
  }
})();
