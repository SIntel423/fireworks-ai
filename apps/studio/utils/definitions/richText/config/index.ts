import externalLink from '@/schemas/fields/links/external';
import internalLink from '@/schemas/fields/links/internal';

import code from '@/utils/definitions/richText/config/code';
import colorDecorator from '@/utils/definitions/richText/config/highlight';
import underline from '@/utils/definitions/richText/config/underline';
import strong from '@/utils/definitions/richText/config/weight';

export const decoratorConfig = {
  code,
  highlight: colorDecorator,
  strong,
  underline,
};

export type DecoratorConfig = keyof typeof decoratorConfig;

export const annotationConfig = { link: externalLink, internalLink };

export type AnnotationConfig = keyof typeof annotationConfig;
