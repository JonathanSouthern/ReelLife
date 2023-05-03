import MovieCard from "@/components/elements/movieCard";
import { MoviesListReturnType } from "@/pages/api/movie/search/[query]";
import {
  Button,
  Center,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

const MovieSearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const [movies, setMovies] = useState<MoviesListReturnType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);
  const currentPage = useRef(1);
  const moviePlaceholder = new Array(10).fill("");

  const retrieveMovies = async (page: number = 1) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:3000/api/movie/search/${query}?page=${page}`
    );
    const data = await response.json();
    //Max results sent from a page is 10.
    if (data.length < 10) {
      setHasMoreResults(false);
    }
    setMovies((prev) => [...prev, ...data]);
    setIsLoading(false);
    currentPage.current += 1;
  };

  useEffect(() => {
    if (query) {
      setMovies([]);
      setHasMoreResults(true);
      retrieveMovies().catch((e) => console.error(e));
    }
  }, [query]);

  return (
    <Container maxW={"container.xl"} my={4} borderRadius={"20px"}>
      <Heading size={"md"} my={5} _hover={{ color: "red" }}>
        {`Showing results for "${query}"`}{" "}
      </Heading>
      <SimpleGrid columns={[1, 2]} spacing={5} mb={4}>
        {isLoading &&
          currentPage.current === 1 &&
          moviePlaceholder.map((_, index) => (
            <Skeleton key={index} height={140} />
          ))}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
      {hasMoreResults ? (
        <Button
          width="100%"
          onClick={() => retrieveMovies(currentPage.current)}
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          <Text width="100%"> More Results </Text>
          <Icon as={AiOutlineDown} />
        </Button>
      ) : (
        <Center> All results have been loaded. </Center>
      )}
    </Container>
  );
};

export default MovieSearchPage;
