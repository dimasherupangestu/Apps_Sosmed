import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { MdPersonSearch } from "react-icons/md";

export const DetailSearch = () => {
  return (
    <Box w={"100%"} h={"100vh"} bg={"#171923"} pt={6}>
      <Box w={"80%"} mx={"auto"}>
        <InputGroup borderRadius={"50px"} size="md" color={"white"}>
          <InputLeftElement
            pointerEvents="none"
            children={<MdPersonSearch size={23} color="white" />}
          />
          <Input
            type="text"
            placeholder="Search..."
            border="1px solid #949494"
            borderRadius={"20px"}
            bg={"#1A202C"}
            px={4}
          />
        </InputGroup>
      </Box>
    </Box>
  );
};
