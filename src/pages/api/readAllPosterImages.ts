import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const readAllPosters = (
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) => {
  const dirRelativeToPublicFolder = "poster-images";

  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map((name) =>
    path.join("/", dirRelativeToPublicFolder, name)
  );

  return res.status(200).json(images);
};

export default readAllPosters;
