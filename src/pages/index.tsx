import {
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  VStack,
} from "@chakra-ui/react";
import PosterBackground from "@/components/modules/posterScrollBackground";
import Link from "next/link";
import { BsBookmark } from "react-icons/bs";

export default function Home() {
  return (
    <Flex
      flexGrow={1}
      alignItems="center"
      justifyItems="center"
      position="relative"
      overflow="hidden"
    >
      <PosterBackground />
      <Container maxW={"container.lg"}>
        <VStack
          spacing={10}
          bgColor="whiteAlpha.900"
          borderRadius={"md"}
          py={10}
        >
          <Heading
            as="h1"
            size={["2xl", "4xl"]}
            noOfLines={2}
            textAlign="center"
          >
            Your Ultimate Movie Companion
          </Heading>
          <Link href="/bookmarks">
            <Button>
              <Icon as={BsBookmark} mr={2} /> View Bookmarks
            </Button>
          </Link>
        </VStack>
      </Container>
    </Flex>
  );
}
