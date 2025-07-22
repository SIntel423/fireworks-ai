import Icon from 'molecules/icon';
import Link, { linkFragment } from 'molecules/link';
import RichText, { richTextFragment } from 'molecules/richText';
import Section from 'molecules/section';

import { bgStyle } from 'global/announcementBar/styles';

import { q, runQuery } from 'lib/client';

const announcementBarQuery = q.star.filterByType('announcementBar').project(announcementBar => ({
  announcement: announcementBar.field('announcement[]').project(richTextFragment).nullable(true),
  link: announcementBar.field('link').project(linkFragment).nullable(true),
  background: q
    .union([q.literal('purple'), q.literal('gradient'), q.literal('dark')])
    .optional()
    .nullable(),
}));

const AnnouncementBar = async () => {
  const query = announcementBarQuery,
    data = (await runQuery(query, {}))[0],
    background = data.background;

  if (!data?.announcement) return null;

  return (
    <Section sectionId="announcementBar" padding={{ top: 'none', bottom: 'none' }} className={bgStyle({ background })}>
      {background === 'gradient' && (
        <div className="absolute-cover z-0 bg-white bg-[url(/backgrounds/noise.jpg)] bg-[50px_50px,_auto] mix-blend-overlay" />
      )}
      <Link
        href={data.link}
        className="group relative z-10 flex items-center justify-center gap-2 py-2 transition-all duration-300"
      >
        <RichText
          blocks={data.announcement}
          className="w-fit text-sm text-black lg:text-center lg:text-md dark:text-white"
        />
        {data.link && (
          <Icon
            icon="arrow-right"
            size={24}
            className="text-black transition-transform group-hover:translate-x-1 dark:text-white"
          />
        )}
      </Link>
    </Section>
  );
};

export default AnnouncementBar;
