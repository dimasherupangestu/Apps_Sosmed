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
import { useFetchChatUser } from "../features/ChatUser/useFetchChatUser";
import { ChatUserProps } from "../types/TypeData";
import { SlOptions } from "react-icons/sl";
import { axiosIntelisen } from "../lib/axios";

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
  const { data, isLoading: useFetchChat } = useFetchChatUser();

  const hendelDelete = async (id: number, id_user: number) => {
    // console.log(id);
    if (getIdUser !== id_user) {
      tost({
        title: "This is not your author",
        status: "info",
        position: "top",
      });
    } else if (getIdUser) {
      try {
        const response = await axiosIntelisen.delete(`/thread/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        tost({
          title: "Delete success",
          status: "info",
          position: "top",
        });
        window.location.reload();
        // console.log("delete", response);
      } catch (err) {
        throw err;
      }
    } else {
      tost({
        title: "Please Login first",
        status: "info",
        position: "top",
      });
      // naviget("/login");
    }
  };
  // const { id, name, username, defcription, avatar, jam, like, image } = props;

  return (
    <Box w={"100%"} h={"100%"}>
      {data?.data.map((data: ChatUserProps) => (
        <Box mt={5} borderBottom={"1px solid #555"} key={data.id}>
          {useFetchChat && <Spinner color="white" size={"lg"} />}
          <HStack px={7} py={4}>
            <Box w={""} mb={"auto"}>
              <Box>
                {data.author.picture ? (
                  <Avatar
                    name="Dan Abrahmov"
                    size="md"
                    src={data.author.picture}
                  />
                ) : (
                  <Avatar name={data.author.name} size="md" bg={"green.500"} />
                )}
              </Box>
            </Box>
            <Box ml={2} w={"100%"}>
              <HStack>
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
                  fontSize={{ base: "0.6rem", md: "0.7rem" }}
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
              <Link key={data.id} to={`/detailStatus/${data.id}`}>
                <HStack mt={2}>
                  <Box
                    color="red"
                    _hover={{ color: "green", cursor: "pointer" }}
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
            </Box>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};
