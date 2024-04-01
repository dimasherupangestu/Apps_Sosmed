import { Equal, Not, Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import ResponsError from "../error/responsError";
import * as bcrypt from "bcrypt";
import { Follow } from "../entity/Follow";
import { equal } from "joi";
import cloudinary from "../libs/cloudinary";
export default new (class UserService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async getUsers(id) {
    // console.log(id);
    return await this.userRepository.find({
      where: { id: Not(id) },
      relations: {
        follower: true,
        following: true,
      },
    });
  }

  async getUserId(id) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        threads: true,
        follower: true,
        following: true,
        likes: true,
        replies: true,
      },
      select: {
        threads: true,
        follower: true,
        following: true,
        likes: true,
        replies: true,
      },
    });
  }
  async getCurrenUser(id) {
    const response = await this.userRepository.findOne({
      where: { id },
      relations: {
        follower: true,
        following: true,
      },
    });
    const follower = await AppDataSource.getRepository(Follow).find({
      where: { follower: Equal(id) },
      relations: {
        following: true,
      },
    });

    const following = await AppDataSource.getRepository(Follow).find({
      where: { following: Equal(id) },
      relations: {
        follower: true,
      },
    });
    return {
      id: response.id,
      name: response.name,
      username: response.username,
      picture: response.picture,
      cover_photo: response.cover_photo,
      bio: response.bio,

      follower,
      following,
    };
  }

  async updateUser(id, session, data) {
    if (session !== id)
      throw new ResponsError(403, "Cannot update another user's profile");
    let user;

    if (!data.password) {
      user = {
        name: data.name,
        username: data.username,
        bio: data.bio,
      };
    } else {
      const hash = bcrypt.hash(data.password, 10);
      user = {
        name: data.name,
        username: data.username,
        password: hash,
        bio: data.bio,
      };
    }
    await this.userRepository.update({ id }, user);
    return {
      massage: "Update success",
      user: data.username,
    };
  }

  async uploadPicture(id, session, picture) {
    if (session !== id)
      throw new ResponsError(403, "Cannot update another user's profile");

    cloudinary.upload();
    const upFIle = await cloudinary.destination(picture);
    await this.userRepository.update({ id }, { picture: upFIle.secure_url });
    return {
      message: "Picture uploaded",
    };
  }
  async uploadCover(id, session, cover: string) {
    
    if (session !== id)
      throw new ResponsError(403, "Cannot update another user's profile");

    cloudinary.upload();
    const upFIle = await cloudinary.destination(cover);
    await this.userRepository.update(id, { cover_photo: upFIle.secure_url });
    return {
      message: "Cover uploaded",
    };
  }

  async deleteUser(id, session) {
    if (session !== id)
      throw new ResponsError(403, "Cannot delete another user's account");
    const user = await this.userRepository.findOne({
      where: { id },
    });

    await this.userRepository.delete({ id });
    return {
      message: "Account deleted",
    };
  }
})();
