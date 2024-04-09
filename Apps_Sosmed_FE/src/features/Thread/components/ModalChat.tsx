import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { axiosIntelisen } from "../../../lib/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootType } from "../../../types/storeType";
import { LuImagePlus } from "react-icons/lu";

export const ModalChat = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const user = useSelector((state: RootType) => state.userStore);
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value =
      name === "image"
        ? e.target.files
          ? e.target.files[0]
          : null
        : e.target.value;

    if (name === "image") {
      setFile(value as File);
    } else {
      setContent(value as string);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !content) {
      // Handle error when file or content is empty
      return;
    }
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", file);
      const response = await axiosIntelisen.post("/thread", formData, config);
      toast({
        title: "Successfully added a post",
        status: "success",
        position: "top",
      });
      console.log("tes", response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box>
        <HStack w={"100%"} mt={5} px={4} pb={5}>
          <Avatar
            mb={"auto"}
            boxSize="3.5em"
            name={user.name}
            src={user.picture ? user.picture : user.username}
          />
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl
              ml={1}
              mt={2}
              w={"full"}
              display={"flex"}
              pb={3}
              gap={3}
              borderBottom={"1px solid #555"}
            >
              <Input
                type="text"
                w={"100%"}
                name="content"
                onChange={handleChange}
                placeholder="What is Happening?!"
                border={"none"}
                color={"white"}
              />
            </FormControl>
            <HStack mt={3}>
              <Box
                as="label"
                htmlFor="image"
                style={{ cursor: "pointer", color: "green", background: "red" }}
              >
                <LuImagePlus size={"2rem"} />
                <Input
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg, image/jpg"
                  name="image"
                  onChange={handleChange}
                  // style={{ display: "none" }}
                />
              </Box>
              <Button
                colorScheme={"green"}
                h={"2.4rem"}
                w={"5rem"}
                type="submit"
                borderRadius={"10px"}
                mr={2}
              >
                Post
              </Button>
            </HStack>
          </form>
        </HStack>
      </Box>
    </Box>
  );
};
