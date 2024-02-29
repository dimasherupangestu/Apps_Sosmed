import { Text } from "@chakra-ui/react";
import { Layout } from "../layout/layout";
import { HomeChat } from "../components/HomeChat";

export const Home = () => {
  return (
    <>
      <Layout>
        <HomeChat />
      </Layout>
    </>
  );
};
