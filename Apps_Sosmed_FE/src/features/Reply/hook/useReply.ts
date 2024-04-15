import { useDispatch, useSelector } from "react-redux";
import { axiosIntelisen } from "../../../lib/axios";
import { GET_THREAD_One, UpdateLike } from "../../../store/Slice/getTheadOne";
import { RootType } from "../../../types/storeType";
import { useChatUser } from "../../Thread/hook/useThread";
import { useToast } from "@chakra-ui/react";

export const useReply = () => {
  const user = useSelector((state: RootType) => state.userStore.id);
  const token = localStorage.getItem("token");
  const tost = useToast();
  const dispatch = useDispatch();
  const { useGetThread } = useChatUser();

  const getThreadOne = async (id: number, id_user: number) => {
    try {
      const response = await axiosIntelisen.get(`/thread/${id}?id=${id_user}`);
      // console.log("data", response.data);
      dispatch(GET_THREAD_One({ data: response.data }));
      useGetThread(user);

      // return response;
    } catch (error) {
      console.log(error);
    }
  };

  const hendelLike = async (id: number) => {
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
        `/like/thread/`,
        { thread: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("like", response);

      getThreadOne(id, user);
    } catch (err) {
      console.log(err);
    }
  };

  const hendelUnlike = async (id: number) => {
    if (!token) {
      tost({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
      return;
    }
    try {
      const response = await axiosIntelisen.delete(`/unlike/thread?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("unlike", response);
      // useGetThread(user);
      getThreadOne(id, user);
    } catch (err) {
      console.log(err);
    }
  };

  const likeReply = async (id: number, id_thread: number) => {
    const response = await axiosIntelisen.post(
      "/like/reply",
      { reply: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getThreadOne(id_thread, user);
    dispatch(UpdateLike(response.data));
    console.log(response.data);
  };

  const unlikeReply = async (id: number, id_thread: number) => {
    try {
      const response = await axiosIntelisen.delete(`/unlike/reply?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getThreadOne(id_thread, user);
      console.log("unlike", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hendelDelete = async (id: number, id_user: number) => {
    if (user !== id_user) {
      tost({
        position: "top",
        status: "info",
        title: "This is not your author",
      });
    } else {
      try {
        const response = await axiosIntelisen.delete(`/reply/${id}?=${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        tost({
          position: "top",
          status: "success",
          title: "success delete ",
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return {
    getThreadOne,
    hendelLike,
    hendelUnlike,
    likeReply,
    unlikeReply,
    hendelDelete,
  };
};
