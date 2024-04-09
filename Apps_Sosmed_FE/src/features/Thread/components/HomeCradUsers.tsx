import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CardChat } from "../../../components/CardChat";
import { RootType } from "../../../types/storeType";
import { useChatUser } from "../hook/useThread";

export const HomeCradUsers: React.FC = () => {
  const thread = useSelector((state: RootType) => state.GetThread.data);
  const user = useSelector((state: RootType) => state.userStore);

  // const tost = useToast();
  const { useGetThread, hendelLike, hendelDelete, hendelUnlike } =
    useChatUser();

  useEffect(() => {
    useGetThread(user.id);
  }, [user.id]);
  return (
    <Box w={"100%"} h={"100%"}>
      {thread.map((data: any, index: number) => (
        <CardChat key={index} {...data} type="thread" />
      ))}
    </Box>
  );
};
