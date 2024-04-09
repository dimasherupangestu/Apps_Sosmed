import { Box, HStack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../types/storeType";
import { useReply } from "../features/Reply/hook/useReply";
import { useChatUser } from "../features/Thread/hook/useThread";

interface like {
  isLike: boolean;
  likes: number;
  id?: any;
  idReply?: any;
  typeLike?: string;
}

export const Liked = ({ isLike, likes, id, typeLike, idReply }: like) => {
  const [islike, setIslike] = useState(isLike);
  const [likedCount, setLikedCount] = useState<number>(likes);
  const dispatch = useDispatch();
  const id_Reply = idReply;
  const idThread = id;
  const [type, setType] = useState(typeLike);
  const token = localStorage.getItem("token");
  const tost = useToast();
  const { hendelLike, hendelUnlike, useGetThread } = useChatUser();
  const { likeReply, unlikeReply, getThreadOne } = useReply();
  const threadOne = useSelector((state: RootType) => state.GetIdThread.data);
  const user_id = useSelector((state: RootType) => state.userStore.id);
  // console.log("tes", threadOne);
  const handleLikeClick = () => {
    if (!token) {
      tost({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
    } else {
      if (!islike) {
        if (type === "thread") {
          hendelLike(idThread);
          getThreadOne(idThread, user_id);
          setLikedCount(likedCount + 1);
        } else {
          likeReply(id_Reply);
          getThreadOne(idThread, user_id);
        }
        setIslike(true);
      } else {
        if (type === "thread") {
          hendelUnlike(idThread);
          getThreadOne(idThread, user_id);
        } else {
          unlikeReply(id_Reply);
          getThreadOne(idThread, user_id);
        }
        setIslike(false);
        setLikedCount(likedCount - 1);
      }
    }
  };

  return (
    <HStack>
      <Box onClick={handleLikeClick}>
        {(threadOne.likes.lenght && type === "thread") || islike ? (
          <Box color="white" _hover={{ color: "red", cursor: "pointer" }}>
            <AiFillHeart color="red" size={23} />
          </Box>
        ) : (
          <Box color="red" _hover={{ color: "red", cursor: "pointer" }}>
            <AiFillHeart color="white" size={23} />
          </Box>
        )}
      </Box>
      <Text color={"rgba(255, 255, 255, 0.48)"} fontSize={["0.7rem", "0.8rem"]}>
        {threadOne.likes.lenght && type === "thread"
          ? threadOne.likes
          : likedCount}
      </Text>
    </HStack>
  );
};
