import { Text } from "@chakra-ui/react";
import { Layout } from "../layout/layout";
import { HomeChat } from "../features/Thread/components/HomeChat";

export const Home = () => {
  return (
    <>
      <Layout>
        <HomeChat />
      </Layout>
    </>
  );
};
