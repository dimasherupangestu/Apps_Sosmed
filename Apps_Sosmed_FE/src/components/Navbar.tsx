import {
  Box,
  Button,
  HStack,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IconNav } from "./IconNav";
import { Link } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { ModalChat } from "../features/Thread/components/ModalChat";
import { useRef } from "react";
import { FaFeatherAlt, FaRegIdCard } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hendelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");

    window.location.href = "/login";
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <Box
      bg={"#171923"}
      height={"100%"}
      w={"100%"}
      pt={4}
      px={{ base: "30%", md: "20%", lg: "10%" }}
    >
      <HStack>
        <Heading
          color={"green.600"}
          fontSize={{ base: "0px", md: "0px", lg: "3xl", xl: "4xl" }}
        >
          Circlee
        </Heading>
        <Heading
          color={"green.600"}
          textAlign={"center"}
          fontSize={{ base: "4xl", md: "3xl", lg: "3xl", xl: "4xl" }}
        >
          X
        </Heading>
      </HStack>
      <Box>
        <IconNav />
      </Box>
      <Button
        colorScheme={"green"}
        mx={"auto"}
        w={{ base: "auto", md: "100%" }}
        borderRadius={"40px"}
        display={{ base: "inline-block", md: "inline-block" }}
        px={2}
        mt={5}
        onClick={onOpen}
      >
        <Text display={{ base: "none", md: "inline-block" }}>Post</Text>
        <Text display={{ base: "inline-block", md: "none" }}>
          <FaFeatherAlt />
        </Text>
      </Button>
      {token ? (
        <Box pos={"relative"} top={"12rem"} onClick={hendelLogout}>
          <HStack color={"white"} mt={5}>
            <Text fontSize={"1.7rem"}>
              <TbLogout2 />
            </Text>
            <Text
              fontSize={"0.9rem"}
              display={{ base: "none", md: "none", lg: "inline-block" }}
            >
              Logout
            </Text>
          </HStack>
        </Box>
      ) : (
        <Box pos={"relative"} top={"9rem"}>
          <Link to={"/login"}>
            <HStack color={"white"} mt={5}>
              <Text fontSize={"1.7rem"}>
                <MdLogin size={26} />
              </Text>
              <Text
                fontSize={"0.9rem"}
                display={{ base: "none", md: "none", lg: "inline-block" }}
              >
                Login
              </Text>
            </HStack>
          </Link>

          <Link to={"/login"}>
            <HStack color={"white"} mt={5}>
              <Text fontSize={"1.7rem"}>
                <FaRegIdCard />
              </Text>
              <Text
                fontSize={"0.9rem"}
                display={{ base: "none", md: "none", lg: "inline-block" }}
              >
                Register
              </Text>
            </HStack>
          </Link>
        </Box>
      )}

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

          <ModalFooter>
            <Box
              mr={"auto"}
              color="green"
              _hover={{ cursor: "pointer", color: "white" }}
            >
              <LuImagePlus size={35} />
            </Box>
            <Button
              colorScheme={"green"}
              h={"2.4rem"}
              w={"5rem"}
              borderRadius={"10px"}
              mr={2}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
