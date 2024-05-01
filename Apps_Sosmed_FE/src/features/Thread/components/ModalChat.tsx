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
  const [isloding, setIsloding] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const [file, setFile] = useState<File | null>(null);
  console.log("file", file);
  const [content, setContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "content") {
      setContent(value);
    } else if (name === "gambar") {
      setFile(e.target.files?.[0] || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsloding(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", file as any);
      const response = await axiosIntelisen.post("/thread", formData, config);
      toast({
        title: "Successfully added a post",
        status: "success",
        position: "top",
      });
      console.log(response);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to add a post",
        description: "Something went wrong",
        status: "error",
        position: "top",
      });
    } finally {
      setIsloding(false);
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
                htmlFor="gambar"
                style={{ cursor: "pointer", color: "green" }}
              >
                <LuImagePlus size={"2rem"} />
                <Input
                  name="gambar"
                  id="gambar"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleChange}
                  display={"none"}
                />
              </Box>
              <Button
                colorScheme={"green"}
                h={"2.4rem"}
                w={"5rem"}
                type="submit"
                borderRadius={"10px"}
                mr={2}
                isLoading={isloding}
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
