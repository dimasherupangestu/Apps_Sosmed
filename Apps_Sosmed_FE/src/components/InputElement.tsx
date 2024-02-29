import { Input, InputProps } from "@chakra-ui/react";
import React from "react";

const InputElement: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <>
      <Input {...rest} color={"white"} border={"1px solid #555"} />
    </>
  );
};

export default InputElement;
