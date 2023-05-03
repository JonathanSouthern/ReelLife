import React, { PropsWithChildren } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexGrow={1}
        bgColor={"blackAlpha.300"}
        boxShadow="inner"
        zIndex={-2}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};
export default Layout;
