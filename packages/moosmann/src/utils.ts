export type NonObject =
  | boolean
  | number
  | string
  | any[]
  | ((...args: any) => any)
  | bigint;

export type DynamicDefaultImport<T> = () => Promise<{ default: T }>;

export type NestedKeyof<T> = {
  [K in keyof T & (string | number)]: T[K] extends NonObject
    ? `${K}`
    : `${K}.${NestedKeyof<T[K]>}`;
}[keyof T & (string | number)];

export type DeepPartial<T> = T extends NonObject
  ? T
  : {
      [P in keyof T]?: DeepPartial<T[P]>;
    };

/**
 * If the type is a function type, obtain the return type.
 * Otherwise returns the default type.
 */
export type ReturnTypeOrValue<T, D = T> = T extends (...args: any) => infer R
  ? R
  : D;

/**
 * If the type is a function type, obtain the parameters.
 * Otherwise returns the default type.
 */
export type ParametersOrValue<T, D = T> = T extends (...args: infer P) => any
  ? P
  : D;

/**
 * Traverse T using the period-seperated path K.
 *
 * @example
 * type Result = Get<{ a: { b: { c: string } } }, 'a.b.c'>
 * // Result = string
 */
export type Get<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Get<T[Key], Rest>
    : never
  : never;

export function get<T extends Object, P extends string>(
  obj: T,
  path: P
): Get<T, P> {
  const paths = path.split(".");

  // @ts-ignore
  return paths.reduce((obj, p) => obj[p], obj);
}

export function callOrValue<T, P extends ParametersOrValue<T, []>>(
  maybeCallable: T,
  ...params: P
): ReturnTypeOrValue<T> {
  return typeof maybeCallable === "function"
    ? maybeCallable(...params)
    : maybeCallable;
}
