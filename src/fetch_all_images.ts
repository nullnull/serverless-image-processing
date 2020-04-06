import request from "request-promise";
import "./prototype";

type Images = {
  [k: string]: string;
};

const fetchAllImages = async (processes: any[]) => {
  const imageUrls: string[] = processes
    .filter((x) => x.hasOwnProperty("imageUrl")) // eslint-disable-line no-prototype-builtins
    .map((x) => x.imageUrl);

  const images = await Promise.all(
    imageUrls.map((x) => request.get(x, { encoding: null }))
  );
  return imageUrls.zip(images).toObject() as Images;
};
export default fetchAllImages;
