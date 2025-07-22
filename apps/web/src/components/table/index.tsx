import { hasArrayValues } from '@packages/utils/src/arrays';

import RichText, { richTextFragment } from 'molecules/richText';
import { sectionFragment } from 'molecules/section';
import TableMolecule, { tableMoleculeFragment } from 'molecules/table';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

export type TableFragment = InferFragmentType<typeof tableFragment>;

const Table: FC<TableFragment> = ({ heading, preTableDescription, postTableDescription, columnHeadings, table }) => (
  <div className="flex w-full flex-col gap-8">
    {heading && <h2 className="text-display-md font-medium text-headline">{heading}</h2>}
    {hasArrayValues(preTableDescription) && <RichText blocks={preTableDescription} className="text-lg text-copy" />}
    <TableMolecule columnHeadings={columnHeadings} table={table} />
    {hasArrayValues(postTableDescription) && <RichText blocks={postTableDescription} className="text-lg text-copy" />}
  </div>
);

export type TableQuery = ExtractSanityType<Page, 'table'>;

export const tableFragment = q.fragment<TableQuery>().project(table => ({
  _key: q.string(),
  heading: q.string().optional().nullable(),
  preTableDescription: table.field('preTableDescription[]').project(richTextFragment).nullable(true),
  postTableDescription: table.field('postTableDescription[]').project(richTextFragment).nullable(true),
  ...tableMoleculeFragment,
  ...sectionFragment,
}));

export default Table;
