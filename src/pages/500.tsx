import { Heading, Text, Button, VStack } from "@chakra-ui/react";

export default function InternalError() {
  return (
    <VStack spacing={5} flexGrow={1} alignSelf="center">
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="radial(yellow.400, yellow.500)"
        backgroundClip="text"
      >
        500
      </Heading>
      <Heading as="h3" size="xl">
        Internal Server Error
      </Heading>
      <Text color={"gray.500"} textAlign="center">
        We apologize for the server error, it&apos;s like our IT team is stuck
        in a Groundhog Day scenario trying to fix it.
      </Text>
      <Button bgGradient="radial(yellow.400, yellow.500)" variant="solid">
        Go to Home
      </Button>
    </VStack>
  );
}
