import { hasArrayValues } from '@packages/utils/src/arrays';

import Link from 'molecules/link';
import { hyperLinkStyles } from 'molecules/richText/config/marks';
import { tableHeaderStyle } from 'molecules/table/styles';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type TableFragment = InferFragmentType<typeof tableMoleculeFragment>;

const generateCellCopy = (cell: string) => {
  const match = cell.match(/\[(.+)\]\((.+)\)/);
  if (match)
    return (
      <Link href={match[2]} className={hyperLinkStyles}>
        {match[1]}
      </Link>
    );

  return cell;
};

const TableMolecule: FC<TableFragment> = ({ columnHeadings, table }) => (
  <table className="w-full border-separate border-spacing-0 rounded-lg bg-white dark:bg-neutrals-900">
    <thead>
      {hasArrayValues(columnHeadings) && (
        <tr>
          {columnHeadings.map((columnHeading, index) => (
            <th
              key={columnHeading._key}
              className={tableHeaderStyle({ isFirst: index === 0, isLast: index === columnHeadings.length - 1 })}
            >
              <span className="font-medium text-headline">{columnHeading.label}</span>
            </th>
          ))}
        </tr>
      )}
    </thead>
    {hasArrayValues(table?.rows) && (
      <tbody>
        {table.rows.map(row => (
          <tr key={row._key}>
            {hasArrayValues(row.cells) &&
              row.cells.map((cell, index) => (
                <td key={`cell-${row._key}-${index + 1}`} className="px-2 py-4 text-md leading-normal text-copy">
                  {generateCellCopy(cell)}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    )}
  </table>
);

export type TableQuery = Pick<ExtractSanityType<Page, 'table'>, 'columnHeadings' | 'table'>;

export const tableMoleculeFragment = q.fragment<TableQuery>().project(table => ({
  columnHeadings: table
    .field('columnHeadings[]')
    .project({
      _key: q.string(),
      label: q.string().optional().nullable(),
    })
    .nullable(true),
  table: table
    .field('table')
    .project({
      rows: q
        .array(
          q.object({
            _key: q.string(),
            cells: q.array(q.string()).optional().nullable(),
          }),
        )
        .optional()
        .nullable(),
    })
    .nullable(true),
}));

export default TableMolecule;
