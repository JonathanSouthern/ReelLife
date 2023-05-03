import { getBookmarkedMovies } from "@/helpers/localStorage";
import { BookmarkedMovie, Movie } from "@/types/movie";
import {
  Center,
  Container,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";
import MovieCard from "@/components/modules/movieCard";

type WatchedFilers = "all" | "watched" | "unwatched";

const BookmarksPage = () => {
  const [movies, setMovies] =
    useState<Record<WatchedFilers, BookmarkedMovie[]>>();

  const fetchMovies = () => {
    const bookmarkedMovies = Object.values(getBookmarkedMovies());
    const groupedBookmarks = groupBy(bookmarkedMovies, "watched");
    setMovies({
      all: bookmarkedMovies,
      watched: groupedBookmarks["true"],
      unwatched: groupedBookmarks["false"],
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const BookmarkPanel = ({
    filter,
    movies,
  }: {
    filter: WatchedFilers;
    movies?: Movie[];
  }) => {
    const isAll = filter === "all";

    if (!movies?.length) {
      return (
        <Center
          borderWidth={"4px"}
          minHeight={"100px"}
          borderRadius={"5px"}
        >{`You do not have any ${!isAll ? filter : ""} bookmarks`}</Center>
      );
    }

    return (
      <SimpleGrid columns={[1, 2]} spacing={5}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onChange={fetchMovies} />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Container maxW={"container.xl"} my={4} p={3}>
      <Tabs isFitted variant="solid-rounded">
        <TabList>
          <Tab>All</Tab>
          <Tab>Watched</Tab>
          <Tab>Unwatched</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BookmarkPanel filter="all" movies={movies?.all} />
          </TabPanel>
          <TabPanel>
            <BookmarkPanel filter="watched" movies={movies?.watched} />
          </TabPanel>
          <TabPanel>
            <BookmarkPanel filter="unwatched" movies={movies?.unwatched} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default BookmarksPage;
