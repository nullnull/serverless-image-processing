import { Request, Response } from "express"; // eslint-disable-line no-unused-vars
import config from "./config";

// const SAMPLE_IMAGE_URL =
//   "https://katsumanarisawa.me/_nuxt/img/sunset.768f32b.jpg";

// const SAMPLE_CREDIT_URL =
//   "https://katsumanarisawa.me/_nuxt/img/symbol_2_wh.2d8cacc.png";

type Process = {
  type: string;
  imageUrl?: string;
  args?: any;
  resize?: any;
};

const buildProcesses = (req: Request) => {
  const processes: Process[] = [
    {
      type: "initialize",
      imageUrl: config.SOURCE_URL + req.path,
    },
  ];

  if (req.query.w || req.query.h) {
    processes.push({
      type: "resize",
      args: {
        height: parseInt(req.query.h),
        width: parseInt(req.query.w),
      },
    });
  }

  if (req.query.mark) {
    processes.push({
      type: "composite",
      imageUrl: req.query.mark,
      args: {
        gravity: req.query["mark-gravity"] || "southeast",
      },
      // resize: {
      //   height: parseInt(req.query["mark-h"] || ''),
      //   width: parseInt(req.query["mark-w"] || '')
      // } // TODO: compact
    }); // TODO: compact
  }

  return processes;
};
export default buildProcesses;
