import { Movie } from "@/types/movie";
import axios, { AxiosResponse, isAxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type MoviesListResult = {
  Search?: SearchEntity[] | null;
  totalResults: string;
  Response: string;
};

type SearchEntity = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MoviesListReturnType = Movie[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, page } = req.query;

  try {
    const response: AxiosResponse<MoviesListResult> = await axios(
      `https://movie-database-alternative.p.rapidapi.com/`,
      {
        params: {
          r: "json",
          type: "movie",
          s: query,
          page,
        },
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
        },
      }
    );

    //There's some duplicate movies in response. Duplicates don't have poster so filtering out.
    const filteredMovies = (response.data.Search ?? []).filter(
      (movie) => movie.Poster !== "N/A"
    );
    const formattedMovies: Movie[] = filteredMovies.map((m) => ({
      id: m.imdbID,
      posterUrl: m.Poster,
      title: m.Title,
      year: m.Year,
    }));

    res.status(200).json(formattedMovies);
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return res
        .status(e.response?.status ?? 500)
        .json({ error: e.response?.data.message });
    }
    res.status(500).json({ error: e });
  }
}
