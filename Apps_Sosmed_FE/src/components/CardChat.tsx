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
} from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { SlOptions } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useChatUser } from "../features/Thread/hook/useThread";
import { RootType } from "../types/storeType";
import { Thread } from "../types/TypeData";

export const CardChat = ({ type, ...data }: any) => {
  const thread = useSelector((state: RootType) => state.GetThread.data);
  const user = useSelector((state: RootType) => state.userStore);

  // const tost = useToast();
  const { useGetThread, hendelLike, hendelDelete, hendelUnlike } =
    useChatUser();

  useEffect(() => {
    useGetThread(user.id);
  }, [user.id]);
  return (
    <Box w={"100%"}>
      <Box
        mt={4}
        style={
          type === "profile"
            ? {
                background: "#1A202C",
                borderRadius: "10px",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.8rem",
                paddingBottom: "0.8rem",
              }
            : { background: "#171923", borderBottom: "1px solid #555" }
        }
        key={data.id}
      >
        <HStack px={7} py={4}>
          <Box mb={"auto"}>
            <Box>
              {data.author.picture ? (
                <Avatar
                  name={data.author?.name}
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
                {data.author?.name}
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
                {data.created_at &&
                  formatDistanceToNow(parseISO(data.created_at))}
              </Text>
              <Box h={"15px"} ml={"auto"} px={2} textAlign={"center"}>
                <Menu isLazy>
                  <MenuButton color={"white"}>
                    <SlOptions />
                  </MenuButton>
                  <MenuList textAlign={"left"} color={"#000"}>
                    <MenuItem
                      fontWeight={600}
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
              {!data.isLike ? (
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
    </Box>
  );
};
