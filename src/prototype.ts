function defineProperty(target: any, name: any, f: any) {
  Object.defineProperty(target, name, {
    enumerable: false,
    configurable: false,
    writable: false,
    value: f,
  });
}

// Object
const objectMap = function (this: object, f: (x: any) => any) {
  return Object.entries(this).map(([k, v]) => f([k, v]));
};
defineProperty(Object.prototype, "objectMap", objectMap);

const compact = function (this: object) {
  return Object.entries(this)
    .filter(([k, v]) => Boolean(v))
    .toObject();
};
defineProperty(Object.prototype, "compact", compact);

// Array
const toObject = function (this: Array<[any, any]>) {
  return this.reduce((acc, prop) => {
    return Object.assign({}, acc, { [prop[0]]: prop[1] });
  }, {});
};
defineProperty(Array.prototype, "toObject", toObject);

const zip = function <T, S>(this: Array<T>, ys: Array<S>) {
  const xs = this;
  const zs = [] as Array<[T, S]>;
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zs.push([xs[i], ys[i]]);
  }
  return zs;
};
defineProperty(Array.prototype, "zip", zip);

export {};
