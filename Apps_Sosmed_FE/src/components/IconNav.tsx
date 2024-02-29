import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { Link } from "react-router-dom";
export const IconNav = () => {
  return (
    <Box px={2}>
      <Link to="/">
        <HStack color={"white"} mt={5}>
          <Text
            textAlign={"center"}
            ml={{ base: 0, xl: 0 }}
            fontSize={"1.7rem"}
          >
            <FaHome color="white" />
          </Text>
          <Text
            fontSize={"1rem"}
            display={{ base: "none", md: "none", lg: "inline-block" }}
          >
            Home
          </Text>
        </HStack>
      </Link>
      <Link to={"/search"}>
        <HStack color={"white"} mt={5}>
          <Text fontSize={"1.7rem"}>
            <MdPersonSearch />
          </Text>
          <Text
            fontSize={"0.9rem"}
            display={{ base: "none", md: "none", lg: "inline-block" }}
          >
            Seach
          </Text>
        </HStack>
      </Link>
      <Link to={"/follower"}>
        <HStack color={"white"} mt={5}>
          <Text fontSize={"1.7rem"}>
            <AiFillHeart />
          </Text>
          <Text
            fontSize={"0.9rem"}
            display={{ base: "none", md: "none", lg: "inline-block" }}
          >
            Follow
          </Text>
        </HStack>
      </Link>
      <Link to={"/profile"}>
        <HStack color={"white"} mt={5}>
          <Text fontSize={"1.7rem"}>
            <CgProfile />
          </Text>
          <Text
            fontSize={"0.9rem"}
            display={{ base: "none", md: "none", lg: "inline-block" }}
          >
            Profile
          </Text>
        </HStack>
      </Link>
    </Box>
  );
};
