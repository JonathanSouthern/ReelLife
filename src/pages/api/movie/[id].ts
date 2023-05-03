import axios, { AxiosResponse, isAxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export type RatingsEntity = {
  Source: "Rotten Tomatoes" | "Metacritic" | "Internet Movie Database";
  Value: string;
};

/**Type returned from endpoint */
type DetailedMovie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings?: RatingsEntity[] | null;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type MovieDetailsReturnType = Omit<
  DetailedMovie,
  "Director" | "Writer" | "Genre" | "Actors" | "Language"
> & {
  Director: string[];
  Writer: string[];
  Genre: string[];
  Actors: string[];
  Language: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const response: AxiosResponse<DetailedMovie> = await axios(
      `https://movie-database-alternative.p.rapidapi.com/`,
      {
        params: {
          r: "json",
          type: "movie",
          i: id,
          plot: "long",
        },
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
        },
      }
    );

    // const response = {data: dumb}

    const formattedResponse: any = {
      ...response.data,
      Director: response.data.Director.split(", "),
      Actors: response.data.Actors.split(", "),
      Genre: response.data.Genre.split(", "),
      Language: response.data.Language.split(", "),
      Writer: response.data.Writer.split(", "),
    };

    res.status(200).json(formattedResponse);
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return res
        .status(e.response?.status ?? 500)
        .json({ error: e.response?.data.message });
    }
    res.status(500).json({ error: e });
  }
}
