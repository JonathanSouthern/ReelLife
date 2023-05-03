type IMDBId = string;

export type Movie = {
  id: IMDBId;
  posterUrl: string;
  title: string;
  year: string;
};

export type BookmarkedMovie = Movie & {
  watched: boolean;
};

/** Data */
export type BookmarkedMovies = Record<IMDBId, BookmarkedMovie>;
