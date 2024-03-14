import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../../types/storeType";
import { axiosIntelisen } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { GET_THREAD_One } from "../../store/Slice/getTheadOne";
import { useChatUser } from "../Thread/useThread";

export const useReply = () => {
  const user = useSelector((state: RootType) => state.userStore.id);
  const dispatch = useDispatch();
  const { useGetThread } = useChatUser();

  const getThreadOne = async (id: any) => {
    try {
      const response = await axiosIntelisen.get(`/thread/${id}?id=${user}`);
      console.log("data", response);
      dispatch(GET_THREAD_One({ data: response.data }));
      useGetThread(user);
      // return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getThreadOne,
  };
};
