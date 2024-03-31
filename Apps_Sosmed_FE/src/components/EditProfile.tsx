import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import { useProfile } from "../features/Profile/useProfile";

export const EditProfile = () => {
  const { id } = useParams();

  //   console.log("user", user);
  let boxBg = useColorModeValue("#1A202C", "white !important");
  const { GetUserId, user, form, setForm, hendelSubmit } = useProfile();
  useEffect(() => {
    GetUserId(Number(id));
  }, [id]);
  return (
    <>
      <form onSubmit={hendelSubmit} method="post" enctype="multipart/form-data">
        <Box w={"100%"} height={"100%"} bg={"#171923"}>
          <Flex
            borderRadius="20px"
            bg={"#1A202C"}
            h="auto"
            pb={"20px"}
            pt={"10px"}
            w={{ base: "0px", md: "100%", lg: "100%" }}
            direction="column"
            color={"white"}
            boxSizing="border-box"
          >
            <Box w={"100%"} position={"relative"} className="input header">
              <Image
                src={
                  user?.cover_photo !== undefined
                    ? user?.cover_photo
                    : "https://i.ibb.co/xmP2pS6/Profile.png"
                }
                width={"100%"}
                filter={"grayscale(80%)"}
                height={"10rem"}
                borderRadius={"10px"}
              />
              <Box
                w={65}
                h={65}
                position={"absolute"}
                as="label"
                htmlFor="header"
                zIndex={4}
                top={9}
                border={"4px solid #171923"}
                left={"45%"}
                bg={"#fff"}
                cursor={"pointer"}
                display={"flex"}
                justifyContent={"center"}
                borderRadius={"100%"}
              >
                <Input
                  type="file"
                  id="header"
                  accept="image/png, image/jpeg"
                  name="header"
                  formEncType="multipart/form-data"
                  //   onChange={}
                  display={"none"}
                />
                <Center>
                  <RiImageAddFill color={"#38a169"} size={40} />
                </Center>
              </Box>
            </Box>
            <Box ml={"auto"} mr={"20px"} color={"white"}>
              <Button
                w={"7rem"}
                type={"submit"}
                height={"30px"}
                position={"relative"}
                top={"20px"}
                px={4}
                py={4}
                ml={"-20px"}
                bg={"#38a169"}
                border={"1px solid #555"}
                borderRadius={"40px"}
                color={"white"}
                _hover={{ bg: "#38a169" }}
              >
                Save Edit
              </Button>
            </Box>
            <Flex flexDirection="column" mb="10px" px={4} mt="-30px">
              <Box className="input img" position={"relative"}>
                <Avatar
                  src={user?.picture}
                  name={user?.name}
                  filter={"grayscale(80%)"}
                  border="5px solid #1A202C"
                  ml={"20px"}
                  borderColor={boxBg}
                  width="68px"
                  height="68px"
                  mt="-38px"
                  borderRadius="50%"
                />
                <Box
                  w={"2rem"}
                  h={"2rem"}
                  position={"absolute"}
                  as="label"
                  htmlFor="profile_picture"
                  zIndex={4}
                  top={1}
                  border={"3px solid #171923"}
                  left={"10%"}
                  bg={"#fff"}
                  cursor={"pointer"}
                  display={"flex"}
                  justifyContent={"center"}
                  borderRadius={"100%"}
                >
                  <Center>
                    <RiImageAddFill color={"#38a169"} size={20} />
                  </Center>
                  <Input
                    type="file"
                    id="profile_picture"
                    accept="image/png, image/jpeg"
                    name="profile_picture"
                    formEncType="multipart/form-data"
                    //   onChange={(event) => {
                    //     const img = event.target.files![0];
                    //     setProfilePreview(URL.createObjectURL(img));
                    //     return setEditProfilePicture(img);
                    //   }}
                    display={"none"}
                  />
                </Box>
              </Box>

              <Box ml={"auto"} mt={"4px"} color={"white"}></Box>
              <input
                style={{
                  color: "#CBD5E0",
                  backgroundColor: "#1A202C",
                  width: "100%",
                  fontSize: "1.1rem",
                  borderBottom: "1px solid #444",
                  lineHeight: "1.5",
                  resize: "none",
                  outline: "none",
                  marginTop: "24px",
                  paddingBottom: "5px",
                }}
                name="name"
                required={true}
                value={form?.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
              <input
                style={{
                  color: "#CBD5E0",
                  backgroundColor: "#1A202C",
                  width: "100%",
                  fontSize: "1.1rem",
                  borderBottom: "1px solid #444",
                  lineHeight: "1.5",
                  resize: "none",
                  outline: "none",
                  marginTop: "24px",
                  paddingBottom: "5px",
                }}
                name="username"
                required={true}
                value={form?.username}
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                }}
              />
              <Box>
                <input
                  style={{
                    color: "#CBD5E0",
                    backgroundColor: "#1A202C",
                    width: "100%",
                    fontSize: "1.1rem",
                    borderBottom: "1px solid #444",
                    lineHeight: "1.5",
                    resize: "none",
                    outline: "none",
                    marginTop: "24px",
                    paddingBottom: "5px",
                  }}
                  name="bio"
                  required={true}
                  onChange={(e) => {
                    setForm({ ...form, bio: e.target.value });
                  }}
                  placeholder="masukan Bio anda ..."
                  value={form?.bio}
                />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </form>
    </>
  );
};
