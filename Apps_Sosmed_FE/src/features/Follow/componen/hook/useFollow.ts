import { useToast } from "@chakra-ui/react";
import { axiosIntelisen } from "../../../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../../../User/useUser";

export const useFollow = () => {
  const token = localStorage.getItem("token");
  const tost = useToast();
  const naviget = useNavigate();
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const { getUser } = useUser();
  const getFollowers = async (id: number) => {
    const response = await axiosIntelisen.get(`/follow/${id}`);
    // console.log("follow", response);
    setFollowers(response.data.follower);
    setFollowing(response.data.following);
  };

  async function hendelFollow(id: number) {
    if (!token) {
      tost({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
      return;
    }
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
      getUser();
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
    if (!token) {
      tost({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
      return;
    }
    try {
      const response = await axiosIntelisen.delete(
        `/unfollow?following=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUser();
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
