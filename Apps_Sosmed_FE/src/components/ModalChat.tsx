import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  useToast,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosIntelisen } from "../lib/axios";
import { ChatUserProps, IFrom } from "../types/TypeData";

export const ModalChat = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     content: "",
  //     author: getIdUser,
  //     image: "",
  //   },
  //   onSubmit: async () => {
  //     const { content, image, author } = formik.values;
  //     console.log(image);
  //     mutate({
  //       content,
  //       author,
  //       image,
  //     });
  //     formik.setFieldValue("content", "");
  //     formik.setFieldValue("image", "");
  //     tost({
  //       title: "Successfully added a post",
  //       status: "success",
  //       position: "top",
  //       duration: 2000,
  //     });
  //     window.location.href = "/";
  //   },
  // });

  // const hendelInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   formik.setFieldValue("content", event.target.value);

  //   formik.setFieldValue("image", event.target.value[0]);
  // };
  const tost = useToast();
  const getIdUser = localStorage.getItem("id");
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

  // console.log("file", file);

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
      window.location.href = "/";
      // console.log("file", file);
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
          <Image
            borderRadius="full"
            mb={"auto"}
            boxSize="3.5em"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
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
                // color="green"
                bg={"#171923"}

                // _hover={{ cursor: "pointer", color: "white" }}
              >
                <Input
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
