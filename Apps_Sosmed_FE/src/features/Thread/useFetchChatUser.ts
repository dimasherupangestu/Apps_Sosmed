import { useQuery } from "@tanstack/react-query";
import { axiosIntelisen } from "../../lib/axios";
import { useState } from "react";
import { ChatUserProps } from "../../types/TypeData";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../../types/storeType";
import { GET_THREAD } from "../../store/Slice/useSliceThered";

export const useFetchChatUser = () => {
  const [dataThread, setDataThread] = useState<ChatUserProps[]>([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const tost = useToast();
  const [isLike, setIsLike] = useState(false);
  console.log("usestate", isLike);
  const getIdUser = useSelector((state: RootType) => state.userStore.id);

  // const { data,  } = useQuery({
  //   queryFn: async () => {
  //     const response = await axiosIntelisen.get("/thread");
  //     console.log(response);
  //     setDataThread(response.data);

  //     return response.data;
  //   },
  //   queryKey: ["chatUser"],
  // });

  const useGetThread = async (id: number) => {
    try {
      const response = await axiosIntelisen.get(`/thread?id=${id}`);
      dispatch(GET_THREAD({ data: response.data }));
      setDataThread(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const hendelLike = async (id: number) => {
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

      useGetThread(id);
    } catch (err) {
      console.log(err);
    }
    if (!token) {
      tost({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
      return;
    }
  };

  const hendelUnlike = async (id: number) => {
    try {
      const response = await axiosIntelisen.delete(`/unlike/thread?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      useGetThread(id);
    } catch (err) {
      console.log(err);
    }
  };

  const hendelDelete = async (id: number, id_user: number) => {
    // console.log(id);
    if (getIdUser !== id_user) {
      tost({
        title: "This is not your author",
        status: "info",
        position: "top",
      });
    } else if (getIdUser) {
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
    isLike,
    setDataThread,
    dataThread,
  };
};
