import { Request, Response } from "express"; // eslint-disable-line no-unused-vars

const SAMPLE_IMAGE_URL =
  "https://katsumanarisawa.me/_nuxt/img/sunset.768f32b.jpg";

const SAMPLE_CREDIT_URL =
  "https://katsumanarisawa.me/_nuxt/img/symbol_2_wh.2d8cacc.png";

const buildProcesses = (req: Request) => {
  // TODO
  return [
    {
      type: "initialize",
      imageUrl: SAMPLE_IMAGE_URL,
    },
    {
      type: "resize",
      args: [1080, 720],
    },
    {
      type: "composite",
      imageUrl: SAMPLE_CREDIT_URL,
      args: {
        gravity: "southeast",
      },
      resize: { height: 30 },
    },
  ];
};
export default buildProcesses;
