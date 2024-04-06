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
import { useEffect } from "react";
import { CgComment } from "react-icons/cg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useReply } from "../hook/useReply";
import { Liked } from "../../like/Liked";
import { axiosIntelisen } from "../../../lib/axios";
import { RootType } from "../../../types/storeType";
import { InputStatus } from "../../../components/InputStatus";
import { formatDistanceToNow, parseISO } from "date-fns";
4;

export const DetailReply = () => {
  const { id } = useParams();
  // console.log("id", id);
  const token = localStorage.getItem("token");
  const { getThreadOne, hendelDelete } = useReply();

  const user = useSelector((state: RootType) => state.userStore);
  const threadOne = useSelector((state: RootType) => state.GetIdThread.data);
  console.log("ThreadOne", threadOne);

  useEffect(() => {
    getThreadOne(id);
  }, [user, Liked]);

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
                    {item.created_at &&
                      formatDistanceToNow(parseISO(item.created_at))}
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
