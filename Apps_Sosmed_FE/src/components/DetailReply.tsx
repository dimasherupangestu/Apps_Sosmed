import {
  Avatar,
  Box,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
4;
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { InputStatus } from "./InputStatus";
import { axiosIntelisen } from "../lib/axios";
import { SlOptions } from "react-icons/sl";
import { useReply } from "../features/Reply/useReply";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../types/storeType";
import { useChatUser } from "../features/Thread/useThread";
import { Liked } from "../features/like/Liked";

export const DetailReply = () => {
  const { id } = useParams();
  // console.log("id", id);
  const tost = useToast();

  const token = localStorage.getItem("token");
  const { getThreadOne } = useReply();

  const user = useSelector((state: RootType) => state.userStore);
  const threadOne = useSelector((state: RootType) => state.GetIdThread.data);
  console.log("ThreadOne", threadOne);

  // const { hendelLike, hendelUnlike, useGetThread } = useChatUser();

  useEffect(() => {
    getThreadOne(id);
  }, [user, Liked]);
  const hendelDelete = async (id: number, id_user: number) => {
    if (user.id !== id_user) {
      tost({
        position: "top",
        status: "info",
        title: "This is not your author",
      });
    } else {
      try {
        const response = await axiosIntelisen.delete(`/reply/${id}?=${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        tost({
          position: "top",
          status: "success",
          title: "success delete ",
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
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
  return (
    <Box w={"100%"} h={"full"} minH={"100vh"} color={"#fff"}>
      <Box px={4}>
        <Link to={"/"}>
          <HStack>
            <IoMdArrowRoundBack size={23} />
            <Text fontSize={"1.7rem"} fontWeight={500}>
              Status
            </Text>
          </HStack>
        </Link>

        <Box mt={5} borderBottom={"1px solid #555"}>
          <HStack px={4} py={4}>
            <Box w={""} mb={"auto"}>
              <Box>
                <Avatar
                  name={threadOne?.author.name}
                  size="md"
                  src={threadOne?.author.picture}
                />
              </Box>
            </Box>
            <Box ml={2}>
              <HStack>
                <Heading
                  fontSize={["0.7rem", "1rem", "1.2rem"]}
                  color={"white"}
                  textTransform={"capitalize"}
                >
                  {threadOne?.author.name}
                </Heading>
                <Text
                  color={"RGBA(255, 255, 255, 0.48)"}
                  fontSize={["0.7rem", "0.8rem", "0.7rem"]}
                >
                  {/* {convertDate(threadOne?.created_at)} */}
                </Text>
              </HStack>

              <Text
                color={"RGBA(255, 255, 255, 0.48)"}
                fontSize={["0.7rem", "0.8rem", "0.7rem"]}
                mt={1}
              >
                @{threadOne?.author.username}
              </Text>
            </Box>
          </HStack>
          <Box px={4}>
            <Text color={"white"} fontSize={["0.7rem", "0.8rem"]} mt={1}>
              {threadOne?.content}
            </Text>
            <HStack
              mt={2}
              color={"white"}
              w={"30%"}
              borderRadius={"20px"}
              overflow={"hidden"}
            >
              {threadOne?.image && <Image src={threadOne.image} />}
            </HStack>
            <HStack mt={2} pb={3}>
              {""}
              <Liked
                isLike={threadOne.isLike}
                likes={threadOne.likes.length}
                id={threadOne.id}
                typeLike="thread"
              />

              <Box color="white" _hover={{ color: "green", cursor: "pointer" }}>
                <CgComment size={23} />
              </Box>
              <Text
                color={"rgba(255, 255, 255, 0.48)"}
                fontSize={["0.7rem", "0.8rem"]}
              >
                {threadOne.replies?.length}
              </Text>
            </HStack>
          </Box>
        </Box>
        <InputStatus />
        {/* reply */}

        {threadOne?.replies?.map((item: any) => (
          <Box
            w={"100%"}
            h={"auto"}
            borderBottom={"1px solid #555"}
            key={item.id}
          >
            <HStack px={4} py={4}>
              <Box w={""} mb={"auto"}>
                <Box>
                  <Avatar
                    name={item?.author.name}
                    size="md"
                    src={item?.author.picture}
                  />
                </Box>
              </Box>
              <Box ml={2} w={"100%"}>
                <HStack align={"center"}>
                  <Heading
                    fontSize={["0.7rem", "1rem"]}
                    color={"white"}
                    textTransform={"capitalize"}
                  >
                    {item?.author.name}
                  </Heading>
                  <Text
                    color={"RGBA(255, 255, 255, 0.48)"}
                    fontSize={["0.7rem", "0.8rem", "0.7rem"]}
                  >
                    @ {item.author.username}
                  </Text>
                  <Text
                    color={"RGBA(255, 255, 255, 0.48)"}
                    fontSize={["0.7rem", "0.8rem", "0.7rem"]}
                  >
                    {convertDate(item?.created_at)}
                  </Text>
                  <Box h={"15px"} ml={"auto"} px={2} textAlign={"center"}>
                    <Menu isLazy>
                      <MenuButton color={"white"}>
                        <SlOptions />
                      </MenuButton>
                      <MenuList textAlign={"left"}>
                        <MenuItem
                          color={"black"}
                          onClick={() => hendelDelete(item.id, item.author.id)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                </HStack>
                <Box>
                  <Text color={"white"} fontSize={["0.7rem", "0.8rem"]} mt={1}>
                    {item.content}
                  </Text>
                  <HStack
                    mt={2}
                    color={"white"}
                    w={"30%"}
                    borderRadius={"20px"}
                    overflow={"hidden"}
                  >
                    {item?.image && <Image src={item.image} />}
                  </HStack>
                  <HStack mt={2} pb={3}>
                    <Liked
                      isLike={item.isLiked}
                      likes={item.likes}
                      typeLike="reply"
                      idReply={item.id}
                    />
                  </HStack>
                </Box>
              </Box>
            </HStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
