import { Box, HStack, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useChatUser } from "../Thread/hook/useThread";
import { axiosIntelisen } from "../../lib/axios";
import { useReply } from "../Reply/hook/useReply";
import { useDispatch } from "react-redux";

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
  // console.log("like", likes);
  const id_Reply = idReply;
  const idThread = id;
  // console.log("idReply", idReply);
  const [type, setType] = useState(typeLike);
  const token = localStorage.getItem("token");
  const tost = useToast();
  const { hendelLike, hendelUnlike, useGetThread } = useChatUser();
  const { likeReply, unlikeReply, getThreadOne } = useReply();
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
          getThreadOne(idThread);
        } else {
          likeReply(id_Reply);
        }
        setIslike(true);
        setLikedCount(likedCount + 1);
      } else {
        if (type === "thread") {
          hendelUnlike(idThread);
        } else {
          unlikeReply(id_Reply);
        }
        setIslike(false);
        setLikedCount(likedCount - 1);
      }
    }
  };

  return (
    <HStack>
      <Box onClick={handleLikeClick}>
        {islike ? (
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
        {likedCount}
      </Text>
    </HStack>
  );
};
