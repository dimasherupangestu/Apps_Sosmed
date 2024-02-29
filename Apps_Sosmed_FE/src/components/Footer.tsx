import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box
      as="footer"
      w={{ base: "0px", md: "100%", lg: "100%" }}
      h={"auto"}
      bg={"#1A202C"}
      mx={"auto"}
      mt={6}
      px={3}
      py={3}
      borderRadius={"10px"}
    >
      <HStack color={"white"}>
        <Text fontSize={"1rem"}>Developed by DimasHeru .</Text>
        <FaGithub size={20} />
        <FaLinkedin size={20} />
        <FaFacebook size={20} />
        <FaInstagram size={20} />
      </HStack>
      <Text fontSize={"0.7rem"} mt={2} color={"#999"}>
        Powered by DumbWays Indonesia . #1 Coding Bootcamp
      </Text>
    </Box>
  );
};
