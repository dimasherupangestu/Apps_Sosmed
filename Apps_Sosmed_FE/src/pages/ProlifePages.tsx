import { Box } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../layout/layout";
import { ProfileUser } from "../features/Profile/components/ProfileUser";

export const ProlifePages = () => {
  return (
    <Box>
      <Layout>
        <ProfileUser />
      </Layout>
    </Box>
  );
};
