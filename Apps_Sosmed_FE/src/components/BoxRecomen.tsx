import { Avatar, Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../types/storeType";
import { axiosIntelisen } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { updateAll } from "../store/Slice/useSliceUserAll";
import { AuthorProps } from "../types/TypeData";
import { CardUser } from "./CardUser";

// interface UserData {
//   id: number;
//   name: string;
//   username: string;
//   avatarUrl: string;
// }

export const BoxRecomen = () => {
  // const user = useSelector((state: RootType) => state.getUserAll);

  // console.log("user", logUser);
  const token = localStorage.getItem("token");
  if (!token) return;
  const { data, refetch } = useQuery<AuthorProps[]>({
    queryFn: async () => {
      const response = await axiosIntelisen.get("/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    queryKey: ["recomen"],
  });

  return (
    <Box mt={6}>
      <Flex
        bg={"#1A202C"}
        w={{ base: "0px", md: "100%", lg: "100%" }}
        h={"auto"}
        mx={"auto"}
        px={5}
        pt={3}
        pb={5}
        borderRadius={"10px"}
        direction={"column"}
      >
        <Text color={"white"} fontWeight={600}>
          Suggested for you
        </Text>
        {/* {data &&
          data.map((userData) => (
            <HStack key={userData.username} mt={4}>
              <Avatar name={userData.name} src={userData.picture} />
              <Text color={"white"} fontSize={"0.9rem"}>
                {userData.username}
                <Text color={"gray.400"} fontSize={"0.7rem"}>
                  @{userData.username}
                </Text>
              </Text>
              <Button
                border={"1px solid #555"}
                bg={"none"}
                color={"gray.400"}
                w={"5.3rem"}
                px={4}
                h={"2rem"}
                ml={"auto"}
                borderRadius={"20px"}
                fontSize={"0.9rem"}
                _hover={{ bg: "green.500", color: "white" }}
              >
                Follow
              </Button>
            </HStack>
          ))} */}

        {data?.map((data: AuthorProps, index: number) => (
          <Box key={index}>
            <CardUser
              id={data.id}
              refect={refetch}
              name={data.name}
              picture={data.picture}
              username={data.username}
              follower={data.follower}
              following={data.following}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
