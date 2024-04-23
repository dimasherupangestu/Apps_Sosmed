import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputElement from "../components/InputElement";
import { axiosIntelisen } from "../lib/axios";

export const Register = () => {
  if (localStorage.getItem("token")) {
    window.location.href = "/";
  }
  const tost = useToast();

  const [register, setRegister] = useState({
    name: "",
    username: "",
    password: "",
  });
  const naviget = useNavigate();
  if (localStorage.getItem("token")) {
    return (window.location.href = "/");
  }
  const hendelLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axiosIntelisen.post("/register", register);

    tost({
      title: "Register Success",
      status: "success",
      isClosable: true,
      position: "top",
    });
    naviget("/login");
    console.log(response);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box bg={"#171923"} h={"100vh"}>
      <Box pt={2}>
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

          <Stack mt={4} spacing={4}>
            <InputElement
              name={"register.name"}
              type="type"
              placeholder="Full Name"
              onChange={(e) =>
                setRegister({ ...register, name: e.target.value })
              }
            />
            <InputElement
              name={"username"}
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setRegister({ ...register, username: e.target.value })
              }
            />
            <InputElement
              name={"password"}
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
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
    </Box>
  );
};
