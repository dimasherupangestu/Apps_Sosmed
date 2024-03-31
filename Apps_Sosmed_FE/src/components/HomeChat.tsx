import {
  Box,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { InputStatus } from "./InputStatus";
import { useRef } from "react";
import { ModalChat } from "./ModalChat";
import { HomeCradUsers } from "./HomeCradUsers";
import { useNavigate } from "react-router-dom";

export const HomeChat = () => {
  const getIdUser = localStorage.getItem("id");
  const tost = useToast();
  const naviget = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const hendelOpen = () => {
    if (!getIdUser) {
      tost({
        title: "Please Login first",
        status: "error",
      });
      naviget("/login");
    } else {
      onOpen();
    }
  };
  return (
    <Box
      w={"100%"}
      h={"100%"}
      bg={"#171923"}
      py={4}

      // borderLeft={"1px solid #555"}
    >
      <Box>
        <Heading color={"white"} fontSize={["xl", "2xl"]} px={4}>
          Home
        </Heading>
        <Box onClick={hendelOpen}>
          <InputStatus />
        </Box>

        {/* awal modal*/}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size={"lg"}
        >
          <ModalOverlay />
          <ModalContent bg={"#171923"} color={"white"}>
            <ModalCloseButton />

            <Box py={3}>
              <ModalChat />
            </Box>
            {/*  */}
          </ModalContent>
        </Modal>
        {/* AKHIR modal*/}

        <HomeCradUsers />
      </Box>
    </Box>
  );
};
