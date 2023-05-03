import { Card, CardBody, CardFooter, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import BookmarkButtons from "@/components/elements/bookmarkButtons";
import Image from "@/components/elements/chakraNextImage";
import { BookmarkedMovies, Movie } from "@/types/movie";

type MovieCardProps = {
  movie: Movie;
  onChange?: (result: BookmarkedMovies) => void;
};

const MovieCard = ({ movie, onChange }: MovieCardProps) => {
  const router = useRouter();

  const goToMovie = () => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="outline"
      bgColor={"primary.50"}
      onClick={goToMovie}
      _hover={{ cursor: "pointer" }}
      size="sm"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        width={100}
        height={140}
        src={movie.posterUrl}
        alt={`${movie.title} post`}
      />
      <Stack flexGrow={1}>
        <CardBody>
          <Heading size="md">{movie.title}</Heading>
        </CardBody>
        <CardFooter justifyContent="space-between">
          <Heading size="md" color="GrayText">
            {movie.year}
          </Heading>
          <BookmarkButtons movie={movie} onChange={onChange} />
        </CardFooter>
      </Stack>
    </Card>
  );
};
export default MovieCard;
