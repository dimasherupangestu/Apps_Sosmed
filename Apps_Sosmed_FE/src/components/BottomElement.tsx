import { Button, ButtonGroupProps } from "@chakra-ui/react";
import React from "react";
interface ButtonElemet {
  children: React.ReactNode;
  ress: ButtonGroupProps;
}
export const BottomElement = ({ children }: ButtonElemet) => {
  return (
    <>
      <Button
        bg={"green.600"}
        _hover={{ bg: "green.800", cursor: "pointer" }}
        mt={2}
        borderRadius={"40px"}
        color={"white"}
      >
        {children}
      </Button>
    </>
  );
};
