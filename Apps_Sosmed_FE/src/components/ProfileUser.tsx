import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const ProfileUser = () => {
  const usernameToken = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/login");
  }
  return (
    <Box w={"100%"} height={"100%"} bg={"#171923"}>
      <Box
        w={"100%"}
        height={"3.4rem"}
        borderBottom={"1px solid #555"}
        px={4}
        py={2}
      >
        <HStack>
          <Link to={"/"}>
            <Text color={"white"} fontSize={"2rem"}>
              <IoMdArrowRoundBack />
            </Text>
          </Link>
          <Text
            textTransform={"capitalize"}
            fontSize={"1.4rem"}
            ml={4}
            color={"white"}
          >
            {usernameToken}
          </Text>
        </HStack>
      </Box>
      <Box w={"100%"} height={"15rem"} bg={"gray"}></Box>
    </Box>
  );
};
