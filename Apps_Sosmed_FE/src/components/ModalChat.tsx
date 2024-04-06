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

import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosIntelisen } from "../lib/axios";
import { ChatUserProps, IFrom } from "../types/TypeData";
import { RootType } from "../types/storeType";
import { RiImageAddLine } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";

export const ModalChat = () => {
  const tost = useToast();
  const naviget = useNavigate();
  const user = useSelector((state: RootType) => state.userStore);
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const [file, setFile] = useState<IFrom>({
    content: "",
    image: null,
  });

  const hendelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosIntelisen.post("/thread", file, config);
      // console.log(response);
      tost({
        title: "Successfully added a post",
        status: "success",
        position: "top",
      });
      // console.log("tes", response.data);
      // console.log("file", file);
      naviget("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate } = useMutation<void, ChatUserProps, any>({
    mutationFn: async (body): Promise<void> => {
      await axiosIntelisen.post("/thread", body);
    },
  });
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
          <form onSubmit={hendelSubmit} style={{ width: "100%" }}>
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
                onChange={(e) =>
                  setFile((prevFile) => ({
                    ...prevFile,
                    content: e.target.value,
                  }))
                }
                placeholder="What is Happening?!"
                border={"none"}
                color={"white"}
              />
            </FormControl>
            <HStack mt={3}>
              <Box
                mr={"auto"}
                zIndex={"1"}
                as="label"
                htmlFor="image"
                cursor="pointer"
                color="green"
                bg={"#171923"}
                _hover={{ cursor: "pointer", color: "white" }}
              >
                <Box ml={3}>
                  <LuImagePlus size={"2rem"} />
                </Box>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFile((prevFile) => ({
                      ...prevFile,
                      image: e.target.files![0],
                    }))
                  }
                  accept="image/jpg, image/jpeg, image/png"
                  mr={"2rem"}
                  w={"100%"}
                  border={"none"}
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
