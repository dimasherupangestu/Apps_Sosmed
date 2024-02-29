import { Box, Button, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import InputElement from "../components/InputElement";

import { Link, useNavigate } from "react-router-dom";
import { axiosIntelisen } from "../lib/axios";

export const Login = () => {
  const naviget = useNavigate();
  if (localStorage.getItem("token")) {
    return (window.location.href = "/");
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const hendelLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosIntelisen.post("/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user.id);
      localStorage.setItem("username", response.data.user.username);

      naviget("/");
      console.log(response);
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
          Login To Circle
        </Text>
        <Stack mt={4} spacing={4}>
          <InputElement
            name={username}
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputElement
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={hendelLogin}>Login</Button>
          <HStack pb={3}>
            <Text color={"white"}>Don't have an account yet?</Text>
            <Text color={"green.500"}>
              <Link to={"/register"}>Create Account</Link>
            </Text>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
