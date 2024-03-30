import {
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

export const InputStatus = () => {
  const { id } = useParams();
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
        <Image
          borderRadius="full"
          boxSize="3.5em"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
        <form onSubmit={hendelSubmit}>
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
            <Box color="green" _hover={{ cursor: "pointer", color: "white" }}>
              <Input
                type="file"
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
              w={"5rem"}
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
