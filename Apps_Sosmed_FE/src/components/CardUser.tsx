import { Avatar, Box, Button, HStack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AuthorProps } from "../types/TypeData";
import { useSelector } from "react-redux";
import { RootType } from "../types/storeType";
import { useMutation } from "@tanstack/react-query";
import { axiosIntelisen } from "../lib/axios";
import { useFollow } from "../features/Follow/componen/hook/useFollow";
export const CardUser = (data: any) => {
  // console.log("dataid", data.id);
  const user = useSelector((state: RootType) => state.userStore);
  const token = localStorage.getItem("token");

  const { getFollowers, hendelFollow, hendelUnfollow, following } = useFollow();

  useEffect(() => {
    if (!token) return;
    getFollowers(user.id);
  }, [user]);
  return (
    <Box w={"100%"}>
      <HStack mt={4}>
        <Avatar name={data.name} src={data.picture} />
        <Text color={"white"} fontSize={"0.9rem"}>
          {data.name}
          <Text color={"gray.400"} fontSize={"0.7rem"}>
            @{data.username}
          </Text>
        </Text>

        {!following.some((foll) => foll.id === data.id) ? (
          <Button
            border={"1px solid #555"}
            bg={"none"}
            color={"gray.400"}
            w={"6rem"}
            px={6}
            h={"2.3rem"}
            ml={"auto"}
            borderRadius={"20px"}
            fontSize={"0.9rem"}
            _hover={{ bg: "green.400", color: "white" }}
            onClick={() => (hendelFollow(data.id), getFollowers(user.id))}
          >
            Follow
          </Button>
        ) : (
          <Button
            border={"1px solid #555"}
            bg={"green.400"}
            color={"white"}
            px={6}
            w={"6.4rem"}
            h={"2.4rem"}
            ml={"auto"}
            borderRadius={"20px"}
            fontSize={"0.9rem"}
            _hover={{ bg: "none", color: "gray.400" }}
            onClick={() => (hendelUnfollow(data.id), getFollowers(user.id))}
          >
            Unfollow
          </Button>
        )}
      </HStack>
    </Box>
  );
};
