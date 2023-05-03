import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  Link as ChakraLink,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
} from "@chakra-ui/react";
import { TfiMenu } from "react-icons/tfi";
import Searchbar from "../elements/searchbar";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="nav" bg="bg-surface" bgColor={"blackAlpha.900"}>
      <Container maxW={"container.xl"} py={{ base: "4", lg: "5" }}>
        <HStack justify="space-between">
          <Flex flex="1">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width="80" height="60" />
            </Link>
          </Flex>
          {isDesktop ? (
            <Flex justifyContent={"end"} flex="1" alignItems="center">
              <ChakraLink as={Link} href="/bookmarks" mr={4} color="yellow.400">
                Bookmarks
              </ChakraLink>
              <Searchbar />
            </Flex>
          ) : (
            <IconButton
              variant="ghost"
              icon={<TfiMenu fontSize="1.25rem" />}
              aria-label="Open Menu"
              onClick={onOpen}
            />
          )}
        </HStack>
      </Container>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgColor={"blackAlpha.900"}>
          <DrawerCloseButton color={"white"} />
          <DrawerHeader color={"yellow.400"}>REEL LIFE</DrawerHeader>
          <DrawerBody>
            <Searchbar onSearch={onClose} />
            <Link href="/bookmarks">
              <Button mt={4} width="100%" onClick={onClose}>
                Bookmarks
              </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default Navbar;
