import { Box, Center, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="bg-surface"
      py={4}
      mt="auto"
      bgColor={"blackAlpha.900"}
      color="white"
    >
      <Center>
        <Text>
          Built by{" "}
          <Link
            href="https://www.jonathan-southern.com/"
            isExternal
            color={"yellow.400"}
          >
            Jonathan Southern
          </Link>
        </Text>
      </Center>
    </Box>
  );
};
export default Footer;
