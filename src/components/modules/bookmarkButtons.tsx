import {
  HStack,
  Icon,
  IconButton,
  IconButtonProps,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { BookmarkedMovies, Movie } from "@/types/movie";
import {
  getBookmarkedMovie,
  removeBookmarkedMovie,
  upsertBookmarkedMovie,
} from "@/helpers/localStorage";
import { MouseEvent, useState } from "react";

const defaultIconProps = (isToggled: boolean) => ({
  variant: isToggled ? ["solid", "ghost"] : ["outline", "ghost"],
  size: "sm",
});

type BookmarkButtonProps = {
  /**Movie to check for/add in local storage */
  movie: Movie;
  /**Props to ovveride default styling for each button */
  buttonProps?: Omit<IconButtonProps, "aria-label">;
  /**
   * List of movies to check agaist
   * @default Localstorage Will check againt local storage and parse each change
   */
  listOfMovies?: BookmarkedMovies;
  onChange?: (result: BookmarkedMovies) => void;
};

const BookmarkButtons = ({
  movie,
  buttonProps = {},
  listOfMovies,
  onChange = () => {},
}: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    Boolean(getBookmarkedMovie(movie.id))
  );
  const [isWatched, setIsWatched] = useState<boolean>(
    getBookmarkedMovie(movie.id)?.watched ?? false
  );

  const toggleBookmark = (event: MouseEvent) => {
    event.stopPropagation();

    if (isBookmarked) {
      setIsBookmarked(false);
      setIsWatched(false);
      onChange(removeBookmarkedMovie(movie.id, listOfMovies));
    } else {
      setIsBookmarked(true);
      onChange(
        upsertBookmarkedMovie({ ...movie, watched: false }, listOfMovies)
      );
    }
  };

  const toggleWatched = (event: MouseEvent) => {
    event.stopPropagation();
    if (isWatched) {
      setIsWatched(false);
      onChange(
        upsertBookmarkedMovie({ ...movie, watched: false }, listOfMovies)
      );
    } else {
      setIsWatched(true);
      onChange(
        upsertBookmarkedMovie({ ...movie, watched: true }, listOfMovies)
      );
    }
  };

  return (
    <HStack>
      <Tooltip
        label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        <IconButton
          aria-label="Bookmark Movie"
          onClick={toggleBookmark}
          icon={<Icon as={isBookmarked ? BsBookmarkFill : BsBookmark} />}
          {...defaultIconProps(isBookmarked)}
          {...buttonProps}
        />
      </Tooltip>
      {isBookmarked && (
        <Tooltip
          label={isWatched ? "Remove from watched list" : "Add to watched list"}
        >
          <IconButton
            aria-label="Watched Movie"
            onClick={toggleWatched}
            icon={<Icon as={isWatched ? AiFillEye : AiOutlineEye} />}
            {...defaultIconProps(isWatched)}
            {...buttonProps}
          />
        </Tooltip>
      )}
    </HStack>
  );
};
export default BookmarkButtons;
