import {
  Badge,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MovieDetailsReturnType, RatingsEntity } from "../api/movie/[id]";
import { useToast } from "@chakra-ui/react";
import axios, { isAxiosError } from "axios";
import BookmarkButtons from "@/components/elements/bookmarkButtons";
import { BookmarkedMovie } from "@/types/movie";
import NextImage from "next/image";

const DetailSection = ({
  heading,
  details,
}: {
  heading: string;
  details: JSX.Element;
}) => {
  return (
    <HStack justifyContent="space-between" alignItems="start">
      <Heading as={"h5"} size="md">
        {heading}
      </Heading>
      {details}
    </HStack>
  );
};

const ListSection = ({
  heading,
  list = [],
}: {
  heading: string;
  list?: string[];
}) => {
  return (
    <Stack spacing={2}>
      <Heading as={"h5"} size="md">
        {heading}
      </Heading>
      <Wrap>
        {" "}
        {list.map((badge) => (
          <WrapItem key={badge}>
            <Badge>{badge}</Badge>
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
};

const TextSection = ({
  heading,
  body = "",
}: {
  heading: string;
  body?: string;
}) => {
  return (
    <Stack spacing={2}>
      <Heading as={"h5"} size="md">
        {heading}
      </Heading>
      <Text>{body}</Text>
    </Stack>
  );
};

const RatingLogo: Record<RatingsEntity["Source"], string> = {
  "Internet Movie Database": "/imdb-logo.png",
  Metacritic: "/metacritic-logo.png",
  "Rotten Tomatoes": "/rotten-tomato-logo.png",
};

const convertDetailedMovie = (
  movie: MovieDetailsReturnType
): BookmarkedMovie => ({
  id: movie.imdbID,
  posterUrl: movie.Poster,
  title: movie.Title,
  year: movie.Year,
  watched: false,
});

const MoviePage = () => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieDetailsReturnType | undefined>();

  const retrieveMovie = async () => {
    try {
      const response = await axios(`/api/movie/${id}`);
      setMovie(response.data);
    } catch (err) {
      return toast({
        title: "Failed to retrieve movie",
        description: isAxiosError(err) ? err.response?.data.error : err,
        status: "error",
        duration: null,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (id) {
      retrieveMovie();
    }
  }, [id]);

  const isLoaded = Boolean(movie);

  return (
    <Container maxW={"container.lg"} my={4}>
      <Grid
        templateRows={["auto", "1fr"]}
        templateColumns={["minmax(0, 1fr)", "repeat(3, 1fr)"]}
        gap={4}
      >
        <GridItem rowSpan={1}>
          {isLoaded ? (
            <Image
              src={movie?.Poster}
              width={"500px"}
              alt="moviePoster"
              shadow="lg"
              borderRadius="md"
            />
          ) : (
            <Skeleton width={350} height={500} />
          )}
        </GridItem>
        <GridItem rowStart={[3, "auto"]} colStart={1}>
          <Stack
            bgColor={"primary.50"}
            borderRadius={"md"}
            boxShadow={"base"}
            paddingX={4}
            pb={2}
          >
            <SkeletonText isLoaded={isLoaded} noOfLines={6} />
            <DetailSection
              heading="Age Rating"
              details={<Text>{movie?.Rated}</Text>}
            />
            <DetailSection
              heading="Run Time"
              details={<Text>{movie?.Runtime}</Text>}
            />
            <DetailSection
              heading="Genre"
              details={
                <Wrap justify="end" alignSelf="center">
                  {movie?.Genre.map((genre) => (
                    <WrapItem key={genre}>
                      <Badge>{genre}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              }
            />
          </Stack>
        </GridItem>
        <GridItem
          rowSpan={["auto", 2]}
          colSpan={["auto", 2]}
          rowStart={["auto", 1]}
          colStart={["auto", 2]}
        >
          <Stack
            bgColor={"primary.50"}
            borderRadius={"md"}
            boxShadow={"base"}
            flexGrow={1}
            spacing={3}
            paddingX={4}
            alignSelf="stretch"
            pb={3}
          >
            <SkeletonText
              isLoaded={isLoaded}
              spacing={3}
              noOfLines={30}
              width="auto"
              my={2}
            />
            <Stack
              direction={["column", "row"]}
              alignItems="start"
              justifyContent="space-between"
            >
              <Heading>
                {movie?.Title}
                <Heading as="span" color="GrayText">
                  {" "}
                  ({movie?.Year})
                </Heading>
              </Heading>
              {movie && (
                <BookmarkButtons
                  movie={convertDetailedMovie(movie)}
                  buttonProps={{ size: "lg" }}
                />
              )}
            </Stack>
            <TextSection heading="Plot" body={movie?.Plot} />
            <ListSection heading="Director" list={movie?.Director} />
            <ListSection heading="Writers" list={movie?.Writer} />
            <ListSection heading="Actors" list={movie?.Actors} />
            <TextSection heading="Awards" body={movie?.Awards} />
            <Stack>
              <Heading as={"h5"} size="md">
                Ratings
              </Heading>
              {movie?.Ratings?.map((rating) => (
                <HStack key={rating.Source}>
                  <Tooltip label={rating.Source}>
                    <NextImage
                      src={RatingLogo[rating.Source]}
                      alt={rating.Source}
                      height={40}
                      width={40}
                    />
                  </Tooltip>
                  <Text>{rating.Value}</Text>
                </HStack>
              ))}
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default MoviePage;
