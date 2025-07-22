import BackgroundImage from 'molecules/backgroundImage';
import Button from 'molecules/button';
import Image, { imageFragment } from 'molecules/image';
import Link from 'molecules/link';
import { richTextFragment } from 'molecules/richText';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

type ResourceCardQuery = InferFragmentType<typeof resourceCardFragment>;

const ResourceCard: FC<ResourceCardQuery> = ({ postTitle, featuredImage, blogTags, slug, publishedDate }) => (
  <Link href={`/blog/${slug}`} className="group relative flex flex-col gap-8" disableFocus>
    <div className="relative aspect-[416/250] w-full">
      <BackgroundImage image="texture-1" className="overflow-hidden rounded-lg" />
      {featuredImage && (
        <Image
          {...featuredImage}
          objectCover
          aspectRatio="416/250"
          className="w-full overflow-hidden rounded-lg shadow-none transition-shadow group-hover:shadow-lg group-focus-visible:shadow-lg group-focus-visible:stateful-outline-primary"
        />
      )}
    </div>
    <div className="flex flex-col gap-6">
      {postTitle && (
        <h3 className="line-clamp-2 text-display-xs font-medium text-headline transition-colors group-hover:text-purple-400 group-focus-visible:text-purple-400">
          {postTitle}
        </h3>
      )}
      {(blogTags || publishedDate) && (
        <div className="flex items-center gap-2">
          {blogTags?.[0] && (
            <Button
              label={blogTags?.[0]?.title}
              hierarchy="link"
              className="w-fit group-hover:text-headline hover:text-headline"
            />
          )}
          {publishedDate && (
            <span className="font-favorit text-mono-md text-neutrals-400">
              {new Date(publishedDate).toLocaleDateString('en-US')}
            </span>
          )}
        </div>
      )}
    </div>
  </Link>
);

export const blogCategoryFragment = q.fragmentForType<'blogCategory'>().project({
  title: q.string(),
});

export const resourceCardFragment = q.fragmentForType<'blog'>().project(card => ({
  _id: q.string(),
  postTitle: q.string().optional().nullable(),
  excerpt: card.field('excerpt[]').project(richTextFragment).nullable(true),
  featuredImage: card.field('featuredImage').project(imageFragment).nullable(true),
  blogTags: card.field('blogTags[]').deref().project(blogCategoryFragment).nullable(true),
  slug: ['seo.slug.current', q.string().optional().nullable()],
  publishedDate: q.string().optional().nullable(),
}));

export default ResourceCard;
