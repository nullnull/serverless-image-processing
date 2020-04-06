import sharp from "sharp";
import { Request, Response } from "express"; // eslint-disable-line no-unused-vars
import fetchAllImages from "./fetch_all_images";
import buildProcesses from "./build_processes";

export const convertImage = async (req: Request, res: Response) => {
  console.log("Start convertImage");

  const processes = buildProcesses(req);

  // fetch all images before processing
  const images = await fetchAllImages(processes);

  const image = await processes.reduce(
    async (image: sharp.Sharp | Promise<sharp.Sharp>, process) => {
      if (process.type === "initialize") {
        const inputImage = images[(process as any).imageUrl];
        return await sharp(inputImage);
      } else if (process.type === "resize") {
        const args = (process as any).args;
        return (await image).resize(...args);
      } else if (process.type === "composite") {
        let inputImage: string | Buffer = images[(process as any).imageUrl];
        if (process.resize) {
          inputImage = await sharp(inputImage)
            .resize(process.resize)
            .toBuffer();
        }
        const option = {
          input: inputImage,
          ...process.args,
        };
        return (await image).composite([option]);
      } else {
        return image;
      }
    },
    sharp()
  );

  res.type("jpg");
  res.send(await image.toBuffer());
};
