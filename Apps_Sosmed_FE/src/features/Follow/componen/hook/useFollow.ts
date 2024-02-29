import { useToast } from "@chakra-ui/react";
import { axiosIntelisen } from "../../../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useFollow = () => {
  const token = localStorage.getItem("token");
  const tost = useToast();
  const naviget = useNavigate();
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);

  const getFollowers = async (id: number) => {
    const response = await axiosIntelisen.get(`/follow/${id}`);
    console.log("data", response);
    setFollowers(response.data.follower);
    setFollowing(response.data.following);
  };

  async function hendelFollow(id: number) {
    try {
      const response = await axiosIntelisen.post(
        "/follow",
        {
          following: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // tost({
      //   title: "Follow Success",
      //   status: "success",
      //   position: "top",
      // });
    } catch (error) {
      console.log(error);
    }
  }

  async function hendelUnfollow(id: number) {
    try {
      const response = await axiosIntelisen.delete(
        `/unfollow?following=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // naviget("/follower");
    } catch (error) {
      console.log(error);
    }
  }
  return {
    hendelFollow,
    hendelUnfollow,
    getFollowers,
    followers,
    following,
    setFollowing,
    setFollowers,
  };
};
