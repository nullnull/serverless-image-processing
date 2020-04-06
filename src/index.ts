import sharp from "sharp";
/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import fetchAllImages, { Images } from "./fetch_all_images";
import buildProcesses, {
  InitializeProcess,
  ResizeProcess,
  CompositeProcess,
} from "./build_processes";
/* eslint-enable no-unused-vars */

const initialize = (
  images: Images,
  process: InitializeProcess
): sharp.Sharp => {
  const inputImage = images[process.imageUrl];
  return sharp(inputImage);
};

const resize = (image: sharp.Sharp, process: ResizeProcess): sharp.Sharp => {
  const args = (process as any).args;
  return image.resize(args);
};

const composite = async (
  image: sharp.Sharp,
  images: Images,
  process: CompositeProcess
) => {
  let inputImage: string | Buffer = images[(process as any).imageUrl];
  if (process.resize) {
    inputImage = await sharp(inputImage).resize(process.resize).toBuffer();
  }
  const option = {
    input: inputImage,
    ...process.args,
  };
  return image.composite([option]);
};

export const convertImage = async (req: Request, res: Response) => {
  // build processes from request path and query
  const processes = buildProcesses(req);

  // fetch all images before processing
  const images = await fetchAllImages(processes);

  // process image
  const image = await processes.reduce(
    async (image: sharp.Sharp | Promise<sharp.Sharp>, process) => {
      if (process.type === "initialize") {
        return initialize(images, process as InitializeProcess);
      } else if (process.type === "resize") {
        return resize(await image, process as ResizeProcess);
      } else if (process.type === "composite") {
        return composite(await image, images, process as CompositeProcess);
      } else {
        return image;
      }
    },
    sharp()
  );

  res.type("jpg");
  res.send(await image.toBuffer());
};
