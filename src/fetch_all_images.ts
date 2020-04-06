import request from "request-promise";

const toObject = function (xs: Array<[any, any]>): Object {
  return xs.reduce((acc, prop) => {
    return Object.assign({}, acc, { [prop[0]]: prop[1] });
  }, {});
};

const zip = function <T, S>(xs: Array<T>, ys: Array<S>) {
  const zs = [] as Array<[T, S]>;
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zs.push([xs[i], ys[i]]);
  }
  return zs;
};

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
  return toObject(zip(imageUrls, images)) as Images;
};
export default fetchAllImages;
