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

import { InputStatus } from "../../../components/InputStatus";
import { useRef } from "react";
import { ModalChat } from "./ModalChat";
import { HomeCradUsers } from "./HomeCradUsers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootType } from "../../../types/storeType";

export const HomeChat = () => {
  const getIdUser = useSelector((state: RootType) => state.userStore.id);
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
    <Box w={"100%"} h={"100%"} bg={"#171923"} py={4}>
      <Box>
        <Heading color={"white"} fontSize={["xl", "2xl"]} px={4}>
          Home
        </Heading>
        <Box onClick={hendelOpen}>
          {/* component input status */}
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
          </ModalContent>
        </Modal>
        {/* AKHIR modal*/}

        {/* Component thread */}
        <HomeCradUsers />
      </Box>
    </Box>
  );
};
