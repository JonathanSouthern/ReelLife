import { BookmarkedMovie, BookmarkedMovies } from "@/types/movie";

const localStorageKey = "bookmarkedMovies";

export const getBookmarkedMovies = (): BookmarkedMovies => {
  if (typeof window === "undefined") {
    return {};
  }

  const movies = localStorage.getItem(localStorageKey);
  if (!movies) {
    localStorage.setItem(localStorageKey, "{}");
    return {};
  }
  return JSON.parse(movies);
};

export const getBookmarkedMovie = (
  id: string,
  moviesToCheck?: BookmarkedMovies
): BookmarkedMovie | null => {
  const movies = moviesToCheck ?? getBookmarkedMovies();
  return movies[id];
};

export const removeBookmarkedMovie = (
  id: string,
  moviesToCheck?: BookmarkedMovies
): BookmarkedMovies => {
  const movies = moviesToCheck ?? getBookmarkedMovies();
  delete movies[id];
  localStorage.setItem(localStorageKey, JSON.stringify(movies));
  return movies;
};

export const upsertBookmarkedMovie = (
  movie: BookmarkedMovie,
  moviesToCheck?: BookmarkedMovies
): BookmarkedMovies => {
  const movies = moviesToCheck ?? getBookmarkedMovies();
  movies[movie.id] = movie;
  localStorage.setItem(localStorageKey, JSON.stringify(movies));
  return movies;
};
