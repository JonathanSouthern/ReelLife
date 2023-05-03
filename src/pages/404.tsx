import { Heading, Text, Button, VStack } from "@chakra-ui/react";

export default function MissingPage() {
  return (
    <VStack spacing={5} flexGrow={1} alignSelf="center">
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="radial(yellow.400, yellow.500)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Heading as="h3" size="xl">
        Page Not Found
      </Heading>
      <Text color={"gray.500"} textAlign="center">
        We&apos;re sorry, but the page you&apos;re looking for has been cast in
        a lead role for the latest blockbuster film.
        <br />
        Please try again after the premiere.
      </Text>
      <Button bgGradient="radial(yellow.400, yellow.500)" variant="solid">
        Go to Home
      </Button>
    </VStack>
  );
}
