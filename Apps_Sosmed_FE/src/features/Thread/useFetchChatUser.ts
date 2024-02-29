import { useQuery } from "@tanstack/react-query";
import { axiosIntelisen } from "../../lib/axios";

export const useFetchChatUser = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axiosIntelisen.get("/thread");
      console.log(response);
      return response;
    },
    queryKey: ["chatUser"],
  });
  return {
    data,
    isLoading,
  };
};
