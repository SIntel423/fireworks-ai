import 'react';

import type { SectionQueryProps } from 'molecules/section';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    analytics: any;
  }

  type Maybe<T> = T | null | undefined;
  type StripMaybe<T> = Exclude<T, undefined | null | never>;
  type StripArray<T> = T extends Array<infer U> ? U : T;
  type Maybify<T> = {
    [P in keyof T]?: T[P];
  };

  // TODO: Find a way to pass optional props
  type MergePrefer<T, U> = Partial<{
    [K in keyof T | keyof U]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
  }>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type FragmentAny = any;

  type StripMetaProps<T> = Omit<T, '_type' | '_key'>;
  type StripSectionProps<T> = Omit<StripMetaProps<T>, keyof SectionQueryProps>;
}

export interface ClassStyles {
  className?: string;
}

export interface ReactChildren {
  children: ReactNode;
}

export interface PassThroughProps extends ReactChildren, ClassStyles {}

type ExtractKey<T, K extends string> = T extends { [P in K]?: infer U } ? NonNullable<U> : never;

type ExtractKeyFromArray<T extends readonly unknown[], K extends string> = {
  [P in keyof T]: ExtractKey<T[P], K>;
}[number];

export type SearchParams = Promise<{ searchParams: Record<string, string> }>;

export type Params = {
  params: Promise<{
    slug?: string[];
  }>;
} & SearchParams;

export type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type ExtractSanityType<
  T,
  U extends string,
  K extends string | undefined = undefined,
  BKey extends string = 'body',
> = T extends {
  [key in BKey]?: Array<infer B>;
}
  ? B extends { _type: U }
    ? K extends keyof B
      ? B[K]
      : K extends undefined
        ? B
        : never
    : never
  : never;

type EnumerateInc<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? [...Acc, N][number]
  : EnumerateInc<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<EnumerateInc<T>, EnumerateInc<F>> | F;
