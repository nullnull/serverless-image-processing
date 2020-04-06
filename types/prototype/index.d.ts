interface Array<T> {
  toObject: () => object;
  zip: <S>(ys: Array<S>) => Array<[T, S]>;
}

interface Object {
  objectMap: (f: (x: any) => any) => Array<any>;
  compact: () => object;
}
