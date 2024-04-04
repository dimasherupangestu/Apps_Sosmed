import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InputElement from "../components/InputElement";

import { Link, useNavigate } from "react-router-dom";
import { axiosIntelisen } from "../lib/axios";
import { useDispatch } from "react-redux";
import { isValidasi } from "../features/User/hook/isValidasi";
import { Controller } from "react-hook-form";

export const Login = () => {
  const naviget = useNavigate();
  if (localStorage.getItem("token")) {
    return (window.location.href = "/");
  }
  const tost = useToast();
  const dispatch = useDispatch();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const hendelLogin = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axiosIntelisen.post("/login", {
  //       username: username,
  //       password: password,
  //     });
  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("id", response.data.user.id);
  //     tost({
  //       title: "Login Success",
  //       status: "success",
  //       isClosable: true,
  //       position: "top",
  //     });
  //     naviget("/");

  //     console.log("login", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { control, handleSubmit } = isValidasi();
  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const response = await axiosIntelisen.post("/login", data);
      console.log("res", response);
      localStorage.setItem("token", response.data.token);
      tost({
        title: "Login Success",
        status: "success",
        isClosable: true,
        position: "top",
      });
      naviget("/");
    } catch (error: any) {
      console.log(error);
      return tost({
        title: "login failed",
        status: "error",
        description: error.response.data.message || error.message,
        position: "top",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  return (
    <Box bg={"#171923"} h={"100vh"} w={""}>
      <Box pt={20}>
        <Box
          w={"md"}
          bg={"#1A202C"}
          borderRadius={"20px"}
          mx={"auto"}
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", height: "100%" }}
            >
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl isInvalid={!!fieldState.error?.message}>
                    <InputElement
                      name={"username"}
                      type="text"
                      placeholder="username"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {!!fieldState.error?.message ? (
                      <FormErrorMessage>
                        {fieldState.error?.message}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText>
                        We'll never share your Username.
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl mt={2} isInvalid={!!fieldState.error?.message}>
                    <InputElement
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                    {!!fieldState.error?.message && (
                      <FormErrorMessage>
                        {fieldState.error?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Button type="submit" mt={3}>
                Login
              </Button>
            </form>
            <HStack pb={3}>
              <Text color={"white"}>Don't have an account yet?</Text>
              <Text color={"green.500"}>
                <Link to={"/register"}>Create Account</Link>
              </Text>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
