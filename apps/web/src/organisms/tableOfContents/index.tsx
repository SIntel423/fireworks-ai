'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { type FC, useEffect } from 'react';

import Icon from 'molecules/icon';
import Link from 'molecules/link';

import { addActiveHeading, setActiveHeading, useTocActiveHeading } from 'organisms/tableOfContents/store';

import { generateSlug } from 'utils/slugs';

import type { ArbitraryTypedObject, PortableTextMarkDefinition, PortableTextSpan } from '@portabletext/types';
import type { PortableTextBlock } from 'next-sanity';

interface TableOfContentsProps {
  content: PortableTextBlock[];
}

const TableOfContentsHeading = () => <h2 className="font-favorit text-lg text-headline">Table of Contents</h2>;

const TableOfContentsContents: FC<{
  headings: PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
}> = ({ headings }) => {
  const activeHeading = useTocActiveHeading();

  return (
    <ul className="flex flex-col gap-1">
      {headings.map(({ children, style, _key }) => {
        const id = children?.[0]?.text ? generateSlug(children?.[0]?.text) : '';

        return (
          <Link
            key={_key}
            href={`#${id}`}
            className="group flex w-full items-center gap-1 rounded-sm bg-transparent px-2 py-1.5 transition-colors hover:bg-gray/10 data-[active=true]:bg-white hover:dark:bg-gray/20"
            data-active={id === activeHeading}
            onClick={() => setActiveHeading(id)}
          >
            {style === 'h3' && <Icon icon="corner-down-arrow" size={12} className="text-gray" />}
            <li className="text-sm text-gray transition-colors group-data-[active=true]:text-purple-400 dark:text-white/60 group-hover:dark:text-copy">
              {children[0].text}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

const TableOfContents: FC<TableOfContentsProps> = ({ content }) => {
  const headings = content.filter(item => item.style && ['h2', 'h3'].includes(item.style));

  useEffect(() => {
    addActiveHeading(headings?.[0]?.children?.[0]?.text ? generateSlug(headings?.[0]?.children?.[0]?.text) : '');
  }, []);

  return (
    <>
      <div className="sticky top-24 hidden h-fit flex-col gap-6 lg:flex">
        <TableOfContentsHeading />
        <TableOfContentsContents headings={headings} />
      </div>
      <Accordion type="single" collapsible className="lg:hidden">
        <AccordionItem value="table-of-contents" className="flex flex-col">
          <AccordionTrigger className="group flex w-full items-center justify-between gap-2">
            <TableOfContentsHeading />
            <Icon icon="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden data-[state=closed]:animate-(--animate-accordion-slide-up) data-[state=open]:animate-(--animate-accordion-slide-down)">
            <div className="mt-6">
              <TableOfContentsContents headings={headings} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default TableOfContents;
