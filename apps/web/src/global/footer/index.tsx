import { hasArrayValues } from '@packages/utils/src/arrays';

import BackgroundImage from 'molecules/backgroundImage';
import Icon from 'molecules/icon';
import Image, { imageFragment } from 'molecules/image';
import Link, { linkFragment } from 'molecules/link';
import Section from 'molecules/section';

import Heading, { headingFragment } from 'organisms/heading';

import { q, runQuery } from 'lib/client';

import type { IconIds } from '@packages/ui/icons';

const footerQuery = q.star.filterByType('footer').project(footer => ({
  heading: footer.field('heading').project(headingFragment).nullable(true),
  menus: footer.field('menus[]').project(menus => ({
    _key: q.string(),
    label: q.string().optional(),
    links: menus.field('links[]').project(link => ({
      _key: q.string(),
      link: link.field('link').project(linkFragment).nullable(true),
      icon: link.field('icon').as<IconIds>().nullable(),
    })),
  })),
  settings: q.star.filterByType('settings').project(settings => ({
    logo: settings.field('logo').project(imageFragment),
  })),
}));

const Footer = async () => {
  const query = footerQuery,
    data = (await runQuery(query, {}))[0],
    { heading, menus } = data,
    { logo } = data.settings[0];

  return (
    <Section as="footer" sectionId="footer" padding={{ top: 'footer', bottom: 'footer' }} wrapperClassName="px-0">
      <div className="dark overflow-hidden rounded-t-2xl bg-neutrals-900 sm:rounded-2xl">
        {heading && (
          <div className="relative overflow-hidden rounded-2xl px-4 pt-14 pb-6 sm:px-8 sm:pt-16 sm:pb-8 lg:pt-18 lg:pb-18">
            <BackgroundImage image="texture-8" />
            <div className="relative z-10 [&_h2]:max-w-[900px]">
              <Heading {...heading} size="xl" alignment="left" hasWideButton setMaxWidth={false} />
            </div>
          </div>
        )}
        <div className="flex w-full flex-col gap-12 px-4 py-14 sm:px-12 sm:pt-16 sm:pb-12">
          <hr className="border-white/10" />
          <div className="flex w-full flex-col gap-12 lg:flex-row lg:justify-between">
            <div className="h-6 w-fit">{logo && <Image {...logo} className="h-full w-auto brightness-0 invert" />}</div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {hasArrayValues(menus) &&
                menus.map(column => (
                  <div key={column._key} className="flex flex-col gap-3">
                    <h3 className="font-favorit text-sm leading-[0.96] tracking-[0.04em] text-white uppercase">
                      {column.label}
                    </h3>
                    {hasArrayValues(column.links) &&
                      column.links.map(link => (
                        <Link
                          key={link._key}
                          href={link.link}
                          className="flex items-center gap-3 font-favorit text-sm tracking-[0.04em] text-white/50 uppercase transition-colors hover:text-white/80"
                        >
                          {link.icon && <Icon icon={link.icon} size={12} className="min-w-3 text-white" />}
                          <span>{link.link?.label}</span>
                        </Link>
                      ))}
                  </div>
                ))}
            </div>
          </div>
          <div className="font-favorit text-sm leading-[0.96] tracking-[0.04em] text-white/50 uppercase">
            {`© ${new Date().getFullYear()} Fireworks AI, Inc. All rights reserved.`}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
