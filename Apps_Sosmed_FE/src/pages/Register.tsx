import { Box, Button, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import InputElement from "../components/InputElement";
import { BottomElement } from "../components/BottomElement";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { axiosIntelisen } from "../lib/axios";

export const Register = () => {
  if (localStorage.getItem("token")) {
    window.location.href = "/";
  }
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const naviget = useNavigate();
  if (localStorage.getItem("token")) {
    return (window.location.href = "/");
  }
  const hendelLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axiosIntelisen.post("/register", {
      name: name,
      username: username,
      password: password,
    });

    naviget("/login");
    console.log(response);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Box
        w={"md"}
        bg={"#1A202C"}
        borderRadius={"20px"}
        mx={"auto"}
        mt={16}
        shadow={"xl"}
        px={8}
        py={6}
      >
        <Heading color={"green.500"} fontWeight={"bold"}>
          Circle
        </Heading>
        <Text color={"white"} fontSize={"xl"} fontWeight={600}>
          Create Account Circle
        </Text>
        {/* <Text color={"white"} mb="8px">
          Value: {value}
        </Text> */}
        <Stack mt={4} spacing={4}>
          <InputElement
            name={name}
            type="type"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <InputElement
            name={username}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputElement
            name={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={hendelLogin}>Register</Button>
          <HStack pb={3}>
            <Text color={"white"}>Already have account?</Text>

            <Text color={"green.500"}>
              {" "}
              <Link to={"/login"}> Login </Link>
            </Text>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
