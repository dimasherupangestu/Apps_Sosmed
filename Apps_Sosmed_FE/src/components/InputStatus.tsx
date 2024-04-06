import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { LuImagePlus } from "react-icons/lu";
import { axiosIntelisen } from "../lib/axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { IFrom } from "../types/TypeData";
import { RootType } from "../types/storeType";
import { useSelector } from "react-redux";

export const InputStatus = () => {
  const { id } = useParams();
  const user = useSelector((state: RootType) => state.userStore);
  const token = localStorage.getItem("token");
  const toast = useToast();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const [form, setFrom] = useState<IFrom>({
    thread: id,
    content: "",
    image: null,
  });

  const hendelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
      return;
    }
    try {
      const response = await axiosIntelisen.post("/reply/thread", form, config);
      // console.log(response);
      console.log("thread", response.data);
      toast({
        title: "Created new reply success!",
        position: "top",
        status: "success",
      });
      window.location.reload();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <HStack
        w={"100%"}
        h={"100%"}
        mt={5}
        px={4}
        pb={5}
        borderBottom={"1px solid #555"}
      >
        <Avatar boxSize="3.2rem" src={user.picture} name={user.username} />
        <form onSubmit={hendelSubmit} style={{ width: "100%" }}>
          <FormControl ml={1} w={"100%"} display={"flex"} gap={3}>
            <Input
              type="text"
              name="content"
              placeholder="What is Happening?!"
              border={"none"}
              color={"white"}
              onChange={(e) =>
                setFrom((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <Box
              color="green"
              as="label"
              ml={"auto"}
              htmlFor="image"
              _hover={{ cursor: "pointer", color: "white" }}
            >
              <Box ml={"auto"}>
                <LuImagePlus size={"2rem"} />
              </Box>
              <Input
                type="file"
                id="image"
                display={"none"}
                accept="image/jpg, image/jpeg, image/png"
                name="image"
                border={"none"}
                onChange={(e) =>
                  setFrom((prev) => ({ ...prev, image: e.target.files![0] }))
                }
              />
            </Box>

            <Button
              colorScheme={"green"}
              type="submit"
              h={"2rem"}
              w={"6rem"}
              borderRadius={"20px"}
            >
              Post
            </Button>
          </FormControl>
        </form>
      </HStack>
    </Box>
  );
};
