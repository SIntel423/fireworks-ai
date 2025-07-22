'use client';

import * as pagination from '@zag-js/pagination';
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';

import Button from 'molecules/button';

import type { FC } from 'react';

interface PaginationProps {
  count: number;
  pageSize: number;
  setPage: (details: pagination.PageChangeDetails) => void;
}

const Pagination: FC<PaginationProps> = ({ count, pageSize, setPage }) => {
  const [state, send] = useMachine(
    pagination.machine({
      id: useId(),
      count,
      pageSize,
      onPageChange(results) {
        setPage(results);
      },
    }),
    { context: { count, siblingCount: 0 } },
  );

  const api = pagination.connect(state, send, normalizeProps);
  const { page: activePage } = api;

  return (
    <>
      {api.totalPages > 1 && (
        <nav {...api.getRootProps()}>
          <ul className="flex items-center justify-between gap-3">
            <li>
              <Button
                icon="arrow-left"
                iconPosition="start"
                label="Back"
                hierarchy="link"
                disabled={activePage === 1}
                noAnimate
                {...api.getPrevTriggerProps()}
              />
            </li>
            <div className="flex items-center gap-3">
              {api.pages.map((page, i) =>
                page.type === 'page' ? (
                  <a
                    key={page.value}
                    role="button"
                    href={`#${page.value}`}
                    {...api.getItemProps(page)}
                    className="focus-outline-primary"
                  >
                    <li
                      data-active={activePage === page.value}
                      className="font-inter text-md text-cool-950 hover:bg-mud-200 data-[active=true]:bg-cool-950 data-[active=true]:text-wood-50 dark:text-mud-100 dark:hover:bg-mud-50 dark:hover:text-cool-950 dark:data-[active=true]:bg-mud-200 dark:data-[active=true]:text-cool-950 flex min-w-10 items-center justify-center rounded-lg bg-transparent p-3 font-medium transition-colors"
                    >
                      {page.value}
                    </li>
                  </a>
                ) : (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={`ellipsis-${i}`}>
                    <span {...api.getEllipsisProps({ index: i })}>&#8230;</span>
                  </li>
                ),
              )}
            </div>
            <li>
              <Button
                icon="arrow-right"
                iconPosition="end"
                label="Next"
                hierarchy="link"
                disabled={api.totalPages === activePage}
                noAnimate
                {...api.getNextTriggerProps()}
              />
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
