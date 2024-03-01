import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChatUserProps } from "../types/TypeData";
import { SlOptions } from "react-icons/sl";
import { axiosIntelisen } from "../lib/axios";
import { useFetchChatUser } from "../features/Thread/useFetchChatUser";

export const HomeCradUsers: React.FC = () => {
  // const id = useParams.id!;
  const token = localStorage.getItem("token");
  const getIdUser = Number(localStorage.getItem("id"));
  // console.log("userlogin", getIdUser);

  const tost = useToast();
  const naviget = useNavigate();

  const convertDate = (time: string) => {
    const date = new Date(time);

    const timeConvert = date.toLocaleTimeString("id-ID", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
    });
    return timeConvert;
  };
  const {
    data,
    isLoading: useFetchChat,
    dataThread,
    hendelLike,
    hendelDelete,
    hendelUnlike,
    isLike,
  } = useFetchChatUser();

  return (
    <Box w={"100%"} h={"100%"}>
      {dataThread.map((data: ChatUserProps) => (
        <Box mt={5} borderBottom={"1px solid #555"} key={data.id}>
          {useFetchChat && <Spinner color="white" size={"lg"} />}
          <HStack px={7} py={4}>
            <Box w={""} mb={"auto"}>
              <Box>
                {data.author.picture ? (
                  <Avatar
                    name={data.author.name}
                    size="md"
                    src={data.author.picture}
                  />
                ) : (
                  <Avatar name={data.author.name} size="md" />
                )}
              </Box>
            </Box>
            <Box ml={2} w={"100%"}>
              <HStack wrap={"wrap"}>
                <Heading
                  fontSize={["0.7rem", "0.8rem", "0.9rem"]}
                  color={"white"}
                  textTransform={"capitalize"}
                >
                  {data.author.name}
                </Heading>
                <Text
                  color={"RGBA(255, 255, 255, 0.48)"}
                  fontSize={{ base: "0.6rem", md: "0.7rem" }}
                >
                  @{data.author.username}
                </Text>
                <Text
                  color={"RGBA(255, 255, 255, 0.48)"}
                  fontSize={{ base: "0.5rem", md: "0.7rem" }}
                >
                  {convertDate(data?.created_at)}
                </Text>
                <Box h={"15px"} ml={"auto"} px={2} textAlign={"center"}>
                  <Menu isLazy>
                    <MenuButton color={"white"}>
                      <SlOptions />
                    </MenuButton>
                    <MenuList textAlign={"left"}>
                      <MenuItem
                        onClick={() => hendelDelete(data.id, data.author.id)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </HStack>
              <Text color={"white"} fontSize={["0.7rem", "0.8rem"]} mt={1}>
                {data.content}
              </Text>
              {data.image && (
                <Box
                  w={["8rem", "10rem", "20rem"]}
                  my={3}
                  height={["10rem", "11rem", "auto"]}
                  bg={"red"}
                  borderRadius={"20px"}
                  overflow={"hidden"}
                >
                  <Image
                    boxSize="full"
                    objectFit="cover"
                    src={data.image}
                    alt="image"
                  />
                </Box>
              )}
              <HStack mt={2}>
                {isLike === false ? (
                  <HStack>
                    <Box
                      onClick={() => hendelLike(data.id)}
                      color="white"
                      _hover={{ color: "red", cursor: "pointer" }}
                    >
                      <AiFillHeart size={23} />
                    </Box>
                    <Text
                      color={"rgba(255, 255, 255, 0.48)"}
                      fontSize={["0.7rem", "0.8rem"]}
                    >
                      {data.like}
                      {/* {data.} */}
                    </Text>
                  </HStack>
                ) : (
                  <HStack>
                    <Box
                      onClick={() => hendelUnlike(data.id)}
                      color="red"
                      _hover={{ color: "white", cursor: "pointer" }}
                    >
                      <AiFillHeart size={23} />
                    </Box>
                    <Text
                      color={"rgba(255, 255, 255, 0.48)"}
                      fontSize={["0.7rem", "0.8rem"]}
                    >
                      {data.like}
                      {/* {data.} */}
                    </Text>
                  </HStack>
                )}

                <Link key={data.id} to={`/detailStatus/${data.id}`}>
                  <HStack>
                    <Box
                      color="white"
                      _hover={{ color: "green", cursor: "pointer" }}
                    >
                      <CgComment size={23} />
                    </Box>
                    <Text
                      color={"rgba(255, 255, 255, 0.48)"}
                      fontSize={["0.7rem", "0.8rem"]}
                    >
                      {data.replies} Reples
                    </Text>
                  </HStack>
                </Link>
              </HStack>
            </Box>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};
