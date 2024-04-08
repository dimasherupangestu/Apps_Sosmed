import { Box, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { axiosIntelisen } from "../lib/axios";

import { AuthorProps } from "../types/TypeData";
import { CardUser } from "./CardUser";

export const BoxRecomen = () => {
  // const user = useSelector((state: RootType) => state.getUserAll);

  // console.log("user", logUser);
  const token = localStorage.getItem("token");
  if (!token) return;
  const { data, refetch } = useQuery<AuthorProps[]>({
    queryFn: async () => {
      const response = await axiosIntelisen.get("/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    queryKey: ["recomen"],
  });

  return (
    <Box mt={6}>
      <Flex
        bg={"#1A202C"}
        w={{ base: "0px", md: "100%", lg: "100%" }}
        h={"auto"}
        mx={"auto"}
        px={5}
        pt={3}
        pb={5}
        borderRadius={"10px"}
        direction={"column"}
      >
        <Text color={"white"} fontWeight={600}>
          Suggested for you
        </Text>
        <Box minHeight={"100%"} maxHeight={"14rem"} overflowY={"auto"}>
          {data?.map((data: AuthorProps, index: number) => (
            <Box key={index}>
              <CardUser
                id={data.id}
                refect={refetch}
                {...data}
                bio={undefined}
                following={undefined}
              />
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};
