import { twMerge } from 'tailwind-merge';

import { buttonIconContainerVariants, buttonVariants } from 'molecules/button/styles';
import Icon from 'molecules/icon';
import { linkFragment } from 'molecules/link';

import { q } from 'lib/client';

import parseUrl, { ensureLeadingSlash } from 'utils/parseUrl';

import type { IconIds } from '@packages/ui/icons';
import type { VariantProps } from 'class-variance-authority';
import type { InferFragmentType } from 'groqd';
import type { LinkFragment } from 'molecules/link';
import type { ElementType, FC, MouseEventHandler } from 'react';
import type { Navigation } from 'types/sanity.types';

type ButtonFragment = InferFragmentType<typeof buttonFragment>;
type ButtonVariations = VariantProps<typeof buttonVariants>;
export interface ButtonProps extends StripMetaProps<Maybify<Omit<ButtonFragment, 'link'>>> {
  /**
   * An optional CSS class name to apply to the button component.
   */
  className?: string;
  link?: string | ButtonFragment['link'];
  domain?: string;
  /**
   * The optional fallback element type to use for the button, if no link is provided.
   */
  semanticFallback?: ElementType;
  /**
   * The optional label for the button.
   */
  label?: string;
  /**
   * Indicates whether the button should be disabled and not interactive.
   */
  disabled?: boolean;
  /**
   * An optional click event handler for the button component.
   */
  onClick?: MouseEventHandler<HTMLElement>;
  /**
   * The `type` prop specifies the type of the button element. It can be one of the following values:
   * - `'button'`: Renders a standard button element.
   * - `'submit'`: Renders a button that submits a form when clicked.
   * - `'reset'`: Renders a button that resets the form when clicked.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Indicates whether the button should not animate when clicked.
   */
  noAnimate?: boolean;
  /**
   * An optional unique identifier for the button component.
   */
  id?: string;
}

export const getLinkData = (link?: LinkFragment | string | null) => {
  if (!link) return '';

  if (typeof link === 'string') return link;

  switch (link?.type) {
    case 'internalLink':
      return ensureLeadingSlash(link.internalLink?.link || '');
    case 'link':
      return link.link?.href;
  }
};

export const ButtonIcon: FC<{ icon: IconIds; hierarchy?: ButtonFragment['hierarchy'] }> = ({ icon, hierarchy }) =>
  icon && (
    <div
      className={buttonIconContainerVariants({
        isWide: hierarchy?.includes('wide'),
        hierarchy,
      })}
    >
      <Icon icon={icon} className="transition-transform" size={16} />
    </div>
  );

const Button: FC<ButtonProps> = ({
  link,
  label,
  domain,
  hierarchy,
  icon,
  iconPosition,
  className,
  semanticFallback,
  type,
  ...props
}) => {
  const { as: Component, ...urlProps } = parseUrl(
    `${domain ? `https://${domain}` : ''}${getLinkData(link)}` || '',
    semanticFallback,
  );

  return (
    <Component
      className={twMerge(buttonVariants({ hierarchy, iconPosition }), className)}
      type={type}
      {...urlProps}
      {...props}
    >
      {icon && iconPosition === 'start' && <ButtonIcon icon={icon} hierarchy={hierarchy} />}
      {label || (typeof link !== 'string' && link?.label)}
      {icon && iconPosition === 'end' && <ButtonIcon icon={icon} hierarchy={hierarchy} />}
    </Component>
  );
};

type ButtonQuery = StripMaybe<StripArray<Navigation['buttons']>>;
export const buttonFragment = q.fragment<ButtonQuery>().project(button => ({
  _type: q.literal('button'),
  _key: q.string().optional(),
  icon: button.field('icon').as<IconIds>().nullable(),
  iconPosition: q.union([q.literal('start'), q.literal('end')]).nullable(),
  hierarchy: button.field('hierarchy').as<ButtonVariations['hierarchy']>(),
  link: button.field('link').project(linkFragment),
}));

export default Button;
