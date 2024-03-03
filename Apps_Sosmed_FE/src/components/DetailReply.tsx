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
import { Data } from "../json/db";
import { AiFillHeart } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { InputStatus } from "./InputStatus";
import { HomeCradUsers } from "./HomeCradUsers";
import { useQuery } from "@tanstack/react-query";
import { axiosIntelisen } from "../lib/axios";
import { ChatUserProps, DetailProps } from "../types/TypeData";
import { SlOptions } from "react-icons/sl";

export const DetailStatus = () => {
  const { id } = useParams();
  const tost = useToast();

  const idlogin = Number(localStorage.getItem("id"));
  console.log("idlogin", idlogin);
  const token = localStorage.getItem("token");

  // console.log(id);
  const { data } = useQuery({
    queryFn: async () => {
      try {
        const response = await axiosIntelisen.get(`/thread/${id}`);
        console.log(response);
        return response.data;
        // return response;
      } catch (error) {
        console.log(error);
      }
    },
    queryKey: ["detailStatus"],
  });

  const hendelDelete = async (id: number, id_user: number) => {
    if (idlogin !== id_user) {
      tost({
        position: "top",
        status: "info",
        title: "This is not your author",
      });
    } else {
      try {
        const response = await axiosIntelisen.delete(
          `/reply/${id}?=${idlogin}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
                  name="Dan Abrahmov"
                  size="md"
                  src={"https://bit.ly/dan-abramov"}
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
                  {data?.author.name}
                </Heading>
                <Text
                  color={"RGBA(255, 255, 255, 0.48)"}
                  fontSize={["0.7rem", "0.8rem", "0.7rem"]}
                >
                  {convertDate(data?.created_at)}
                </Text>
              </HStack>

              <Text
                color={"RGBA(255, 255, 255, 0.48)"}
                fontSize={["0.7rem", "0.8rem", "0.7rem"]}
                mt={1}
              >
                @{data?.author.username}
              </Text>

              <Text
                color={"RGBA(255, 255, 255, 0.48)"}
                fontSize={["0.7rem", "0.8rem", "0.7rem"]}
                mt={1}
              ></Text>
            </Box>
          </HStack>
          <Box px={4}>
            <Text color={"white"} fontSize={["0.7rem", "0.8rem"]} mt={1}>
              {data?.content}
            </Text>
            <HStack
              mt={2}
              color={"white"}
              w={"30%"}
              borderRadius={"20px"}
              overflow={"hidden"}
            >
              {data?.image && <Image src={data.image} />}
            </HStack>
            <HStack mt={2} pb={3}>
              <Box color="red" _hover={{ color: "green", cursor: "pointer" }}>
                <AiFillHeart size={23} />
              </Box>
              <Text
                color={"rgba(255, 255, 255, 0.48)"}
                fontSize={["0.7rem", "0.8rem"]}
              >
                4
              </Text>
              <Box color="white" _hover={{ color: "green", cursor: "pointer" }}>
                <CgComment size={23} />
              </Box>
              <Text
                color={"rgba(255, 255, 255, 0.48)"}
                fontSize={["0.7rem", "0.8rem"]}
              >
                {data?.replies.length}
              </Text>
            </HStack>
          </Box>
        </Box>
        <InputStatus />
        {/* reply */}
        {data?.replies?.map((item: any) => (
          <Box
            w={"100%"}
            h={"auto"}
          
            borderBottom={"1px solid #555"}
          >
            <HStack px={4} py={4}>
              <Box w={""} mb={"auto"}>
                <Box>
                  <Avatar
                    name="Dan Abrahmov"
                    size="md"
                    src={"https://bit.ly/dan-abramov"}
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
                      400
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </HStack>
          </Box>
        ))}
        {/* <HomeCradUsers /> */}
      </Box>
    </Box>
  );
};
