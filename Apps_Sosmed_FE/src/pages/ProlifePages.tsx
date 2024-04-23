import { Box } from "@chakra-ui/react";
import { ProfileUser } from "../features/Profile/components/ProfileUser";
import { Layout } from "../layout/layout";

export const ProlifePages = () => {
  return (
    <Box>
      <Layout>
        <ProfileUser />
      </Layout>
    </Box>
  );
};
