import { Box } from "@chakra-ui/react";

import { BoxRecomen } from "./BoxRecomen";
import { Footer } from "../Footer";
import { ProfileSlideBar } from "./ProfileSlideBar";

export const SlideBar = () => {
  const token = localStorage.getItem("token");
  return (
    <Box
      bg={"#171923"}
      // bg={"blue"}
      w={{ base: "0px", md: "0px", lg: "100%", xl: "100%" }}
      py={"20px"}
      px={"20px"}
      height={"100%"}
      minHeight={"revert-layer"}
    >
      {token && <ProfileSlideBar />}
      {token && <BoxRecomen />}
      <Footer />
    </Box>
  );
};
