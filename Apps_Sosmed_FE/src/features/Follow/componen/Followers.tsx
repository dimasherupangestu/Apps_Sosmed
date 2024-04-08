import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootType } from "../../../types/storeType";
import { useFollow } from "../hook/useFollow";
import { CardUser } from "../../../components/CardUser";

export const Followers = () => {
  const token = localStorage.getItem("token");
  const user = useSelector((state: RootType) => state.userStore.id);
  const { getFollowers, followers, following } = useFollow();

  useEffect(() => {
    if (!token) return;
    getFollowers(user);
  }, [user]);
  return (
    <Box w={"100%"} h={"100vh"} bg={"#171923"} pt={5}>
      <Box>
        <Heading color={"white"} fontSize={["xl", "2xl"]} px={6}>
          Followers
        </Heading>
        <Tabs
          variant="enclosed"
          mt={5}
          w={"100%"}
          isFitted
          colorScheme="whatsapp"
          color={"white"}
        >
          <TabList>
            <Tab>Follower</Tab>
            <Tab>Following</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box w={"100%"}>
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
    </Box>
  );
};
