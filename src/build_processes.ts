import { Request } from "express"; // eslint-disable-line no-unused-vars
import config from "./config";
import "./prototype";

export type InitializeProcess = {
  type: string;
  imageUrl: string;
};

export type ResizeProcess = {
  type: string;
  args: any;
};

export type CompositeProcess = {
  type: string;
  imageUrl: string;
  args?: any;
  resize?: any;
};

type Process = InitializeProcess | ResizeProcess | CompositeProcess;

export const INVALID_QUERY_ERROR = new Error("Invalid query");

const buildProcesses = (req: Request) => {
  const processes: Process[] = [
    {
      type: "initialize",
      imageUrl: config.SOURCE_URL + req.path,
    } as InitializeProcess,
  ];

  if (req.query.w || req.query.h) {
    const [h, w] = [parseInt(req.query.h), parseInt(req.query.w)];
    if (req.query.h && isNaN(h)) {
      throw INVALID_QUERY_ERROR;
    }
    if (req.query.w && isNaN(w)) {
      throw INVALID_QUERY_ERROR;
    }

    processes.push({
      type: "resize",
      args: {
        height: h,
        width: w,
      }.compact(),
    } as ResizeProcess);
  }

  if (req.query.mark) {
    const [h, w] = [
      parseInt(req.query["mark-h"]),
      parseInt(req.query["mark-w"]),
    ];
    if (req.query["mark-h"] && isNaN(h)) {
      throw INVALID_QUERY_ERROR;
    }
    if (req.query["mark-w"] && isNaN(w)) {
      throw INVALID_QUERY_ERROR;
    }

    processes.push(
      {
        type: "composite",
        imageUrl: req.query.mark,
        args: {
          gravity: req.query["mark-gravity"] || "southeast",
        },
        resize: {
          height: h,
          width: w,
        }.compact(),
      }.compact() as CompositeProcess
    );
  }

  return processes;
};
export default buildProcesses;
