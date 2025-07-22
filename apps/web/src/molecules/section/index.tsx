import { twMerge } from 'tailwind-merge';

import sectionStyles, { wrapperStyles } from 'molecules/section/styles';

import { q } from 'lib/client';

import type { VariantProps } from 'class-variance-authority';
import type { InferFragmentType } from 'groqd';
import type { ElementType, FC, ReactNode } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type SectionVariantTypes = VariantProps<typeof sectionStyles>;
interface SectionProps extends Maybify<SectionQueryProps> {
  /**
   * An optional alternative HTML element type to render the section with.
   */
  as?: ElementType;
  /**
   * A unique identifier for the section.
   */
  id?: string;
  /**
   * The content to be rendered inside the section.
   */
  children: ReactNode;
  /**
   * An optional flag to override the theme mode for the section.
   */
  overrideThemeMode?: boolean;
  /**
   * An optional className to be applied to the section.
   */
  className?: string;
  /**
   * An optional className to be applied to the section wrapper.
   */
  wrapperClassName?: string;
}

const Section: FC<SectionProps> = ({
  as,
  id,
  children,
  sectionId,
  backgroundColor,
  padding,
  overrideThemeMode,
  className,
  wrapperClassName,
}) => {
  const Component = as || 'section';

  return (
    <Component
      id={id || sectionId}
      className={twMerge(
        sectionStyles({
          bgColor: backgroundColor?.label as SectionVariantTypes['bgColor'],
          overrideThemeMode: !!overrideThemeMode,
        }),
        className,
      )}
    >
      <div className={twMerge(wrapperStyles({ ...padding }), wrapperClassName)}>{children}</div>
    </Component>
  );
};

type Section = Omit<ExtractSanityType<Page, 'heading'>, 'heading' | '_type' | '_key' | 'alignment'>;
type SectionVariants = VariantProps<typeof wrapperStyles>;

export const sectionFragment = q.fragment<Section>().project(section => ({
  padding: section
    .field('padding')
    .project(padding => ({
      top: padding.field('top').as<SectionVariants['top']>(),
      bottom: padding.field('bottom').as<SectionVariants['bottom']>(),
    }))
    .nullable(true),
  backgroundColor: q
    .object({
      value: q.string().optional(),
      label: q.string().optional(),
    })
    .optional()
    .nullable(),
  sectionId: ['sectionId.current', q.string().nullable()],
}));

export type SectionQueryProps = InferFragmentType<typeof sectionFragment>;

export default Section;
