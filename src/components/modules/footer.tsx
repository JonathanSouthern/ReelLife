import { Box, Center } from "@chakra-ui/react";

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
      <Center> Built by Jonathan Southern. </Center>
    </Box>
  );
};
export default Footer;
