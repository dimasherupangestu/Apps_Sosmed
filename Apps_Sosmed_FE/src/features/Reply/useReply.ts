import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../../types/storeType";
import { axiosIntelisen } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { GET_THREAD_One } from "../../store/Slice/getTheadOne";
import { useChatUser } from "../Thread/useThread";

export const useReply = () => {
  const user = useSelector((state: RootType) => state.userStore.id);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { useGetThread } = useChatUser();

  const getThreadOne = async (id: any) => {
    try {
      const response = await axiosIntelisen.get(`/thread/${id}?id=${user}`);
      // console.log("data", response);
      dispatch(GET_THREAD_One({ data: response.data }));
      useGetThread(user);

      // return response;
    } catch (error) {
      console.log(error);
    }
  };
  const likeReply = async (id: number) => {
    const response = await axiosIntelisen.post(
      "/like/reply",
      { reply: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  };

  const unlikeReply = async (id: number) => {
    try {
      const response = await axiosIntelisen.delete(`/unlike/reply?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("unlike", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getThreadOne,
    likeReply,
    unlikeReply,
  };
};
