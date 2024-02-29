import { Equal, Repository } from "typeorm";
import { Follow } from "../entity/Follow";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import ResponsError from "../error/responsError";

export default new (class FollowService {
  private readonly followRepository: Repository<Follow> =
    AppDataSource.getRepository(Follow);

  async getFollow(id) {
    const follower = await AppDataSource.getRepository(User).find({
      where: {
        following: {
          follower: Equal(id),
        },
      },
      relations: {
        following: true,
      },
    });
    const following = await AppDataSource.getRepository(User).find({
      where: {
        follower: { following: Equal(id) },
      },
      relations: {
        follower: true,
      },
    });
    return {
      follower,
      following,
    };
  }

  async follow(follower, following) {
    const chk = await this.followRepository.countBy({
      follower: Equal(follower),
      following: Equal(following),
    });

    if (chk) throw new ResponsError(400, "failed to follow this user");
    await this.followRepository.save({ following, follower });
    return {
      massage: "You Sucsussfully follow this User",
    };
  }

  async unfollow(follower, following) {
    const getFollow = await this.followRepository.findOne({
      where: { following: Equal(following), follower: Equal(follower) },
      relations: { following: true, follower: true },
    });
    if (!getFollow)
      throw new ResponsError(400, "You already unfollow this User");
    await this.followRepository.delete(getFollow.id);
    return {
      massage: "Unfollow success",
    };
  }
})();
