import { Card, CardBody, CardFooter, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import BookmarkButtons from "@/components/modules/bookmarkButtons";
import Image from "next/image";
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
      bgColor={"whiteAlpha.900"}
      onClick={goToMovie}
      _hover={{
        cursor: "pointer",
        bgColor: "whiteAlpha.600",
      }}
      size="sm"
      boxShadow={"lg"}
    >
      <Image
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
