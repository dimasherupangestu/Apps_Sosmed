import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { CgComment } from "react-icons/cg";
import { SlOptions } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFollow } from "../../Follow/hook/useFollow";
import { useChatUser } from "../../Thread/hook/useThread";
import { RootType } from "../../../types/storeType";
import { CardUser } from "../../../components/CardUser";

export const ProfileUser = () => {
  let mainText = useColorModeValue("white", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  // const usernameToken = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const user = useSelector((state: RootType) => state.userStore);
  const { useGetThread, hendelDelete } = useChatUser();
  const { getFollowers, followers, following } = useFollow();

  const GetThread = useSelector((state: RootType) => state.GetThread.data);
  // console.log("GetThread", GetThread);
  const filter = GetThread.filter((data: any) => data.author.id === user.id);
  // console.log("filter", filter);

  useEffect(() => {
    if (!token) return;
    useGetThread(user.id);
    getFollowers(user.id);
  }, [user.id]);
  if (!token) {
    return (window.location.href = "/login");
  }

  return (
    <>
      <Box w={"97%"} mx={"auto"} height={"100%"} bg={"#171923"}>
        <Flex
          borderRadius="20px"
          bg={"#1A202C"}
          h="auto"
          pb={"20px"}
          pt={"10px"}
          w={{ base: "0px", md: "100%", lg: "100%" }}
          direction="column"
          color={"white"}
        >
          <Image
            src={
              user.cover_photo !== null
                ? user.cover_photo
                : "https://i.ibb.co/xmP2pS6/Profile.png"
            }
            alt="cover"
            maxW="100%"
            height={"10rem"}
            borderRadius={"10px"}
          />
          <Flex flexDirection="column" mb="10px" px={4}>
            <Avatar
              src={user.picture}
              name={user.name}
              border="5px solid #1A202C"
              ml={"20px"}
              borderColor={"#1A202C"}
              width="68px"
              height="68px"
              mt="-38px"
              borderRadius="50%"
            />
            <Box ml={"auto"} mt={"-20px"} color={"white"}>
              <Link to={`/editprofile/${user.id}`}>
                <Button
                  w={"100%"}
                  height={"30px"}
                  px={4}
                  py={4}
                  bg={"none"}
                  border={"1px solid #555"}
                  borderRadius={"40px"}
                  color={"white"}
                  _hover={{ bg: "#38a169" }}
                >
                  Edit Profile
                </Button>
              </Link>
            </Box>
            <Text
              mt={"-6px"}
              textTransform={"capitalize"}
              fontWeight="600"
              color={mainText}
              textAlign="left"
              fontSize="xl"
            >
              {user.name}
            </Text>
            <Text
              color={secondaryText}
              textAlign="left"
              fontSize="0.9rem"
              fontWeight="500"
            >
              @{user.username}
            </Text>
            <Box>
              <Text color={"white"} mt={1} fontSize={"0.9rem"}>
                {user?.bio}
              </Text>
              <HStack spacing={1} fontSize={"0.8rem"} mt={1}>
                <Text color={secondaryText}>{user.following.length}</Text>
                <Text>Following</Text>
                <Text color={secondaryText} ml={4}>
                  {user.follower.length}
                </Text>
                <Text>Followers</Text>
              </HStack>
            </Box>
          </Flex>
        </Flex>

        {/* Tabs */}
        <Tabs
          variant="unstyled"
          mt={5}
          w={"100%"}
          isFitted
          px={3}
          colorScheme="whatsapp"
          color={"white"}
        >
          <TabList bg={"#1A202C"}>
            <Tab
              _selected={{
                color: "white",
                bg: "green.500",
                borderRadius: "5px",
              }}
            >
              Theads
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: "green.500",
                borderRadius: "5px",
              }}
            >
              Follower
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: "green.500",
                borderRadius: "5px",
              }}
            >
              Following
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box w={"100%"} bg={"#171923"} borderRadius={"10px"}>
                {filter.map((data, index) => (
                  <Box
                    key={index}
                    bg={"#1A202C"}
                    mb={4}
                    borderRadius={"10px"}
                    px={0}
                    py={1}
                  >
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
                            {/* {convertDate(data?.created_at)} */}
                          </Text>
                          <Box
                            h={"15px"}
                            ml={"auto"}
                            px={2}
                            textAlign={"center"}
                          >
                            <Menu isLazy>
                              <MenuButton color={"white"}>
                                <SlOptions />
                              </MenuButton>
                              <MenuList textAlign={"left"} color={"#000"}>
                                <MenuItem
                                  onClick={() =>
                                    hendelDelete(data.id, data.author.id)
                                  }
                                >
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Box>
                        </HStack>
                        <Text
                          color={"white"}
                          fontSize={["0.7rem", "0.8rem"]}
                          mt={1}
                        >
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
                          <Link key={data.id} to={`/detailStatus/${data.id}`}>
                            <HStack>
                              <Box
                                color="white"
                                _hover={{ color: "green", cursor: "pointer" }}
                              >
                                <CgComment size={19} />
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
            </TabPanel>
            <TabPanel>
              <Box w={"100%"} bg={"#171923"} borderRadius={"10px"}>
                {followers.map((data, index) => (
                  <CardUser key={index} {...data} type="follow" />
                ))}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box w={"100%"}>
                {following.map((item, index) => (
                  <CardUser key={index} {...item} type="follow" />
                ))}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
