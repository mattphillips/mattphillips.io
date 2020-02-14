type ExcludeNull<A> = Exclude<A, null>;

export type RecursiveRequired<T> = {
  [P in keyof T]-?: ExcludeNull<T[P]> extends (infer U)[]
    ? RecursiveRequired<U>[]
    : ExcludeNull<T[P]> extends object
    ? RecursiveRequired<ExcludeNull<T[P]>>
    : ExcludeNull<T[P]>;
};
