// import { zod } from 'groqd';

// import type { z } from 'zod';

// export const isValidZodLiteralUnion = <T extends z.ZodLiteral<unknown>>(literals: T[]): literals is [T, T, ...T[]] =>
//   literals.length >= 2;

// export const constructZodLiteralUnionType = <T extends z.ZodLiteral<unknown>>(literals: T[]) => {
//   const uniqueLiterals = [...new Set(literals)];

//   if (!isValidZodLiteralUnion(uniqueLiterals)) {
//     throw new Error(
//       'Literals passed do not meet the criteria for constructing a union schema, the minimum length is 2',
//     );
//   }

//   return zod.union(uniqueLiterals);
// };

// export const constructLiteralArray = <T extends string>(literals: T[]): z.ZodLiteral<T>[] =>
//   literals.map(literal => zod.literal(literal));

// export const constructUnionFromArray = <T extends string>(literals: T[]) =>
//   constructZodLiteralUnionType(constructLiteralArray(literals));
