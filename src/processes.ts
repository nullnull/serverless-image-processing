import sharp from "sharp";
/* eslint-disable no-unused-vars */
import { Images } from "./fetch_all_images";
import {
  InitializeProcess,
  ResizeProcess,
  CompositeProcess,
} from "./build_processes";
/* eslint-enable no-unused-vars */

export const initialize = (
  images: Images,
  process: InitializeProcess
): sharp.Sharp => {
  const inputImage = images[process.imageUrl];
  return sharp(inputImage);
};

export const resize = (
  image: sharp.Sharp,
  process: ResizeProcess
): sharp.Sharp => {
  const args = (process as any).args;
  return image.resize(args);
};

export const composite = async (
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
