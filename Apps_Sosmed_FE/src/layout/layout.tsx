import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../components/Navbar/Navbar";

import { SlideBar } from "../components/SlideBar/SlideBar";

interface layoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: layoutProps) => {
  return (
    <Box as="main" w={"100%"} pos={"relative"}>
      <Flex
        w={"100%"}
        h={"100%"}
        bg={"#171923"}
        minHeight={"100vh"}
        pos={"relative"}
        zIndex={10}
      >
        <Box
          bg={"blue"}
          pos={"relative"}
          textAlign={"right"}
          mr={"auto"}
          w={{ base: "20%", md: "20%", lg: "17%", xl: "20%" }}
        >
          <Box
            pos={"fixed"}
            w={{ base: "18%", md: "18%", lg: "14.6%", xl: "17%" }}
            top={0}
            left={0}
            bottom={0}
            bg={"blue"}
          >
            <Navbar></Navbar>
          </Box>
        </Box>
        <Flex
          w={"100%"}
          h={"100%"}
          // bg={"yellow"}
          pos={"relative"}
          maxHeight={"revert-layer"}
          borderLeft={"1px solid #555"}
        >
          <Box
            w={{ base: "100%", md: "100%", lg: "64%", xl: "65%" }}
            h={"100%"}
            maxHeight={"revert-layer"}

            // borderLeft={{ base: "none", md: "1px solid #555" }}
          >
            {children}
          </Box>
          <Box
            w={{ base: "0px", md: "0px", lg: "37%", xl: "35%" }}
            // bg={"yellow"}
            pos={"relative"}
            maxHeight={"revert-layer"}
            overflow={"hidden"}
            borderLeft={"1px solid #555"}
          >
            <SlideBar></SlideBar>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
