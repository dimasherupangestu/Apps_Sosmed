// @src/components/Profile.js

// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { axiosIntelisen } from "../../lib/axios";
import { RootType } from "../../types/storeType";
import { useEffect } from "react";

import useUser from "../../features/User/hook/useUser";
import { Link } from "react-router-dom";

export const ProfileSlideBar = () => {
  let boxBg = useColorModeValue("#1A202C", "white !important");
  let mainText = useColorModeValue("white", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  // const { getFollowers } = useFollow();
  const user = useSelector((state: RootType) => state.userStore);
  const { getUser } = useUser();
  useEffect(() => {
    if (!token) return;
    getUser();
  }, [token]);
  return (
    <Flex
      borderRadius="20px"
      bg={boxBg}
      px={"20px"}
      pt={"14px"}
      h="auto"
      pb={"20px"}
      w={{ base: "0px", md: "100%", lg: "100%" }}
      mx={"auto"}
      direction="column"
      color={"white"}
    >
      <Text textAlign={"left"} px={2} pb={2} fontWeight={600}>
        My Profile
      </Text>

      <Image
        src={user.cover_photo || "https://i.ibb.co/xmP2pS6/Profile.png"}
        maxW="100%"
        h={"7.4rem"}
        borderRadius="20px"
      />
      <Flex flexDirection="column" mb="10px">
        <Avatar
          src={user.picture}
          name={user.name}
          border="5px solid #1A202C"
          ml={"20px"}
          borderColor={boxBg}
          width="68px"
          height="68px"
          mt="-38px"
          borderRadius="50%"
        />
        <Box ml={"auto"} mt={"-20px"} color={"white"}>
          <Link to={`/profile`}>
            <Button
              w={"100%"}
              height={"30px"}
              px={4}
              py={4}
              bg={"none"}
              border={"1px solid #555"}
              borderRadius={"40px"}
              color={"white"}
              _hover={{ bg: "#38a169" }}
            >
              Edit Profile
            </Button>
          </Link>
        </Box>
        <Text
          fontWeight="600"
          color={mainText}
          textAlign="left"
          mt={2}
          fontSize="xl"
        >
          ✨{user.name}✨
        </Text>
        <Text
          color={secondaryText}
          textAlign="left"
          fontSize="0.9rem"
          fontWeight="500"
        >
          @{user.username}
        </Text>
      </Flex>
      <Box>
        <Text color={"white"} fontSize={"0.9rem"}>
          {user.bio}
        </Text>
        <HStack spacing={1} fontSize={"0.8rem"} mt={1}>
          <Text color={secondaryText}>{user.following.length}</Text>
          <Text>Following</Text>
          <Text color={secondaryText} ml={4}>
            {user.follower.length}
          </Text>
          <Text>Followers</Text>
        </HStack>
      </Box>
    </Flex>
  );
};
