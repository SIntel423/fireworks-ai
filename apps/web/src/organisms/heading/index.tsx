import { twJoin } from 'tailwind-merge';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Button, { buttonFragment } from 'molecules/button';
import ElementAnimation from 'molecules/elementAnimation';
import RichText, { richTextFragment } from 'molecules/richText';

import { bodyStyles, buttonContainerStyles, headingSizeStyles, headingStyles } from 'organisms/heading/styles';

import { q } from 'lib/client';

import customTwMerge from 'utils/twMerge';

import type { VariantProps } from 'class-variance-authority';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

export type HeadingFragment = InferFragmentType<typeof headingFragment>;
export interface HeadingProps
  extends Maybify<Omit<HeadingFragment, 'heading' | 'body' | 'badge'>>,
    VariantProps<typeof headingSizeStyles> {
  alignment?: 'left' | 'center' | null;
  heading?: string | HeadingFragment['heading'];
  body?: string | HeadingFragment['body'];
  children?: React.ReactNode;
  headingTag?: 'h1' | 'h2' | 'h3';
  hasWideButton?: boolean;
  className?: string;
  animationDirection?: keyof typeof animationVariant;
}

const getWideButtonHierarchy = (index: number) => (index % 2 ? 'wide-black' : 'wide-purple');

const animationVariant = {
  top: 'slideInTop',
  bottom: 'slideInBottom',
  left: 'slideInLeft',
  right: 'slideInRight',
} as const;

const Heading: FC<HeadingProps> = ({
  alignment,
  eyebrow,
  heading,
  body,
  size,
  setMaxWidth,
  buttons,
  children,
  headingTag,
  hasWideButton,
  className,
  animationDirection = 'bottom',
}) => {
  const HeadingTag = headingTag || 'h2';

  return (
    (heading || eyebrow || body) && (
      <div className={customTwMerge(headingStyles({ alignment }), className)}>
        {eyebrow && (
          <ElementAnimation animation={animationVariant[animationDirection]} asChild>
            <span className="font-favorit text-md leading-[1] font-medium tracking-[0.04em] text-copy uppercase">
              {eyebrow}
            </span>
          </ElementAnimation>
        )}
        {heading && (
          <ElementAnimation animation={animationVariant[animationDirection]} delay={200} asChild>
            <HeadingTag className={headingSizeStyles({ size, setMaxWidth })}>{heading}</HeadingTag>
          </ElementAnimation>
        )}
        {body && (
          <ElementAnimation animation={animationVariant[animationDirection]} delay={400} asChild>
            {typeof body === 'string' ? (
              <p className={twJoin(bodyStyles, 'body')}>{body}</p>
            ) : (
              <RichText blocks={body} className={twJoin(bodyStyles, 'body')} />
            )}
          </ElementAnimation>
        )}
        {children}
        {hasArrayValues(buttons) && (
          <ElementAnimation animation={animationVariant[animationDirection]} delay={600} asChild>
            <div className={buttonContainerStyles({ alignment })}>
              {buttons.map((button, i) => {
                const overrideHierarchy = hasWideButton ? getWideButtonHierarchy(i) : undefined;

                return (
                  button._type === 'button' && (
                    <Button
                      key={button._key}
                      {...button}
                      hierarchy={overrideHierarchy || button.hierarchy}
                      className={button.hierarchy === 'link' && i === 1 ? 'mx-4' : ''}
                    />
                  )
                );
              })}
            </div>
          </ElementAnimation>
        )}
      </div>
    )
  );
};

type HeadingQuery = StripMaybe<ExtractSanityType<Page, 'heading', 'heading'>>;
export const headingFragment = q.fragment<HeadingQuery>().project(heading => ({
  eyebrow: q.string().optional().nullable(),
  heading: q.string().optional().nullable(),
  body: heading.field('body[]').project(richTextFragment).nullable(true),
  buttons: heading
    .field('buttons[]')
    .project(button => ({
      ...button.conditionalByType({
        button: buttonFragment,
      }),
    }))
    .nullable(true),
}));

export default Heading;
