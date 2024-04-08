import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { axiosIntelisen } from "../../../lib/axios";
import { GET_THREAD } from "../../../store/Slice/useSliceThered";
import { RootType } from "../../../types/storeType";
import { useReply } from "../../Reply/hook/useReply";

export const useChatUser = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const tost = useToast();

  const user = useSelector((state: RootType) => state.userStore.id);
  const useGetThread = async (id: number) => {
    try {
      const response = await axiosIntelisen.get(`/thread?id=${id}`);
      dispatch(GET_THREAD({ data: response.data }));

      // dispatch(Fetch_Thread(useGetThread(id)));
      // console.log(response);
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
      useGetThread(user);
    } catch (err) {
      console.log(err);
    }
    // if (!token) {
    //   tost({
    //     title: "Please Login first",
    //     status: "info",
    //     position: "top",
    //   });
    //   return;
    // }
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
      useGetThread(user);
    } catch (err) {
      console.log(err);
    }
  };

  const hendelDelete = async (id: number, id_user: number) => {
    if (!token) {
      tost({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
      return;
    }
    // console.log(id);
    if (user !== id_user) {
      tost({
        title: "This is not your author",
        status: "info",
        position: "top",
      });
    } else if (user) {
      try {
        const response = await axiosIntelisen.delete(`/thread/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        tost({
          title: "Delete success",
          status: "info",
          position: "top",
        });
        window.location.reload();
        console.log("delete", response);
        return response.data;
      } catch (err) {
        throw err;
      }
    } else {
      tost({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
      // naviget("/login");
    }
  };
  return {
    useGetThread,
    hendelLike,
    hendelDelete,
    hendelUnlike,
  };
};
