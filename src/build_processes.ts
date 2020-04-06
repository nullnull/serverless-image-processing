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

const buildProcesses = (req: Request) => {
  const processes: Process[] = [
    {
      type: "initialize",
      imageUrl: config.SOURCE_URL + req.path,
    } as InitializeProcess,
  ];

  if (req.query.w || req.query.h) {
    processes.push({
      type: "resize",
      args: {
        height: parseInt(req.query.h),
        width: parseInt(req.query.w),
      },
    } as ResizeProcess);
  }

  if (req.query.mark) {
    processes.push(
      {
        type: "composite",
        imageUrl: req.query.mark,
        args: {
          gravity: req.query["mark-gravity"] || "southeast",
        },
        resize: {
          height: parseInt(req.query["mark-h"] || ""),
          width: parseInt(req.query["mark-w"] || ""),
        }.compact(),
      }.compact() as CompositeProcess
    );
  }

  return processes;
};
export default buildProcesses;
