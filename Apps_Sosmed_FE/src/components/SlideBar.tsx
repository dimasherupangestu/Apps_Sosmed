import { Box } from "@chakra-ui/react";
import { ProfileSlideBar } from "./ProfileSlideBar";
import { BoxRecomen } from "./BoxRecomen";
import { Footer } from "./Footer";

export const SlideBar = () => {
  const token = localStorage.getItem("token");
  return (
    <Box
      bg={"#171923"}
      w={{ base: "0px", md: "0px", lg: "100%", xl: "100%" }}
      py={"40px"}
      px={"20px"}
    >
      {token && <ProfileSlideBar />}
      {token && <BoxRecomen />}
      <Footer />
    </Box>
  );
};
