import ResourceCard, { resourceCardFragment } from 'organisms/cards/resource';

import Switchback from 'components/switchback';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

type BlogListingProps = InferFragmentType<typeof blogListingFragment>;

const BlogListing: FC<BlogListingProps> = ({ blogs }) => {
  const [firstBlog, ...restBlogs] = blogs;

  return (
    <div className="flex flex-col gap-24 sm:gap-28 lg:gap-32">
      <Switchback
        featuredImage={firstBlog?.featuredImage}
        heading={{
          heading: firstBlog?.postTitle,
          body: firstBlog?.excerpt,
          buttons: [
            {
              _type: 'button',
              _key: 'button',
              hierarchy: 'primary',
              // @ts-expect-error string links for buttons work - Curtis
              link: firstBlog?.slug ? `/blog/${firstBlog?.slug}` : '',
              label: 'Read More',
            },
          ],
        }}
        mediaType="image"
        mediaBackground="texture-3"
        reverse
      />
      <div id="listing-section" className="flex scroll-m-20 flex-col gap-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {restBlogs.map(card => (
            <ResourceCard key={card._id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const blogListingFragment = q.fragment<FragmentAny>().project({
  _key: q.string(),
  blogs: q.star
    .filterByType('blog')
    .filter('!(_id in path("drafts.**"))')
    .order('publishedDate desc')
    .project(resourceCardFragment),
});

export default BlogListing;
