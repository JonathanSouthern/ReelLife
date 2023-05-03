import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Flex, keyframes } from "@chakra-ui/react";
import axios from "axios";

export default function PosterBackground() {
  const [images, setImages] = useState<string[]>([]);

  const getImages = async () => {
    const response = await axios(`api/readAllPosterImages`);
    setImages(response.data);
  };

  useEffect(() => {
    getImages();
  }, []);

  //Margin for just one side
  const imageMargin = 10;
  const imageWidth = 300;
  const totalWidthOfImage = imageMargin * 2 + imageWidth;
  //${images.length * totalWidthOfImage}

  const slide = keyframes`
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-${
          images.length * totalWidthOfImage
        }px, 0, 0); /* The image width */
      }
    `;

  return (
    <Flex
      direction="row"
      animation={`${slide} 60s linear infinite`}
      position="absolute"
      zIndex={-1}
      bgColor={"black"}
      paddingY="100%"
    >
      {/* Repeat images so we have seamless transisition */}
      {[...images, ...images].map((el: string, index) => (
        <Box
          key={el + index}
          height={"400px"}
          mx={`${imageMargin}px`}
          width={`${imageWidth}px`}
          position="relative"
        >
          <Image
            fill
            alt={`background poster ${el}`}
            src={el}
            style={{ filter: "brightness(75%)" }}
            priority={index < 5}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
      ))}
    </Flex>
  );
}
