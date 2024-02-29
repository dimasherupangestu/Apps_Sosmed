import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AuthorProps } from "../../../types/TypeData";
import { axiosIntelisen } from "../../../lib/axios";
import { useSelector } from "react-redux";
import { RootType } from "../../../types/storeType";
import { useFollow } from "./hook/useFollow";

export const Followers = () => {
  const id = Number(localStorage.getItem("id"));
  const token = localStorage.getItem("token");
  const user = useSelector((state: RootType) => state.userStore.id);
  const { hendelFollow, hendelUnfollow, getFollowers, followers, following } =
    useFollow();

  useEffect(() => {
    if (!token) return;
    getFollowers(id);
  }, [user]);
  return (
    <Box w={"100%"} h={"100vh"} bg={"#171923"} pt={5}>
      <Box>
        <Heading color={"white"} fontSize={["xl", "2xl"]} px={6}>
          Followers
        </Heading>
        <Tabs
          variant="enclosed"
          mt={5}
          w={"100%"}
          isFitted
          colorScheme="whatsapp"
          color={"white"}
        >
          <TabList>
            <Tab>Follower</Tab>
            <Tab>Following</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box w={"100%"}>
                {followers.map((data, index) => (
                  <HStack mb={6} key={index}>
                    <Avatar
                      size={"md"}
                      bg={"green.500"}
                      name={data.name}
                      src={data.picture}
                    />
                    <Box w={"100%"}>
                      <Heading
                        fontSize={["sm", "md"]}
                        textTransform={"capitalize"}
                      >
                        {data.name}
                      </Heading>
                      <Text
                        color={"RGBA(255, 255, 255, 0.48)"}
                        fontSize={"0.9rem"}
                      >
                        @{data.username}
                      </Text>
                      <Text w={"80%"} fontSize={"0.9rem"}>
                        {data.bio}
                      </Text>
                    </Box>
                    {!following.some((item) => item.id === data.id) ? (
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
                        onClick={() => (
                          hendelFollow(data.id), getFollowers(id)
                        )}
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
                        onClick={() => (
                          hendelUnfollow(data.id), getFollowers(id)
                        )}
                      >
                        Unfollow
                      </Button>
                    )}
                  </HStack>
                ))}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box w={"100%"}>
                {following.map((item, index) => (
                  <HStack mb={6} key={index}>
                    <Avatar
                      size={"md"}
                      bg={"green.500"}
                      name={item.name}
                      src={item.picture}
                    />
                    <Box w={"100%"}>
                      <Heading
                        fontSize={["sm", "md"]}
                        textTransform={"capitalize"}
                      >
                        {item.name}
                      </Heading>
                      <Text
                        color={"RGBA(255, 255, 255, 0.48)"}
                        fontSize={"0.9rem"}
                      >
                        @{item.username}
                      </Text>
                      <Text w={"80%"} fontSize={"0.9rem"}>
                        {item.bio}
                      </Text>
                    </Box>
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
                      onClick={() => (
                        hendelUnfollow(item.id), getFollowers(id)
                      )}
                    >
                      Unfollow
                    </Button>
                  </HStack>
                ))}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
