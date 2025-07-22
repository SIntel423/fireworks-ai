import { defineArrayMember, defineField } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import { annotationConfig, decoratorConfig } from '@/utils/definitions/richText/config';
import horizontalRule from '@/utils/definitions/richText/config/horizontalRule';
import listOptions from '@/utils/definitions/richText/config/lists';
import textOptions from '@/utils/definitions/richText/config/text';

import type { AnnotationConfig, DecoratorConfig } from '@/utils/definitions/richText/config';
import type { ListOptions } from '@/utils/definitions/richText/config/lists';
import type { TextOptions } from '@/utils/definitions/richText/config/text';
import type {
  ArrayOfType,
  ArrayRule,
  FieldDefinitionBase,
  FieldGroup,
  SchemaValidationValue,
  ValidationBuilder,
} from 'sanity';

type CommonRichTextOptions = FieldDefinitionBase &
  FieldGroup & {
    decorators?: DecoratorConfig[];
    annotations?: AnnotationConfig[];
    excludedTextStyles?: (TextOptions | ListOptions)[];
    includeHorizontalRule?: boolean;
    additionalSchemas?: ArrayOfType[];
  };

type SingleLineOptions = CommonRichTextOptions & {
  validation?: SchemaValidationValue;
};

type RichTextOptions = CommonRichTextOptions & {
  validation?: ValidationBuilder<ArrayRule<unknown[]>, string>;
};

export const defineSingleLineRichText = ({ name, title, decorators, annotations, ...props }: SingleLineOptions) =>
  defineField({
    name,
    title,
    type: 'pt-string',
    options: {
      decorators: hasArrayValues(decorators) ? decorators.flatMap(decorator => decoratorConfig[decorator]) : [],
      annotations: hasArrayValues(annotations) ? annotations.flatMap(annotation => annotationConfig[annotation]) : [],
    },
    validation: props.validation as SchemaValidationValue,
    ...props,
  });

const defineRichText = ({
  name,
  title,
  decorators,
  annotations,
  excludedTextStyles,
  includeHorizontalRule,
  additionalSchemas,
  ...props
}: RichTextOptions) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: textOptions.filter(type => !excludedTextStyles?.includes(type.value)),
        lists: listOptions.filter(type => !excludedTextStyles?.includes(type.value)),
        marks: {
          decorators: hasArrayValues(decorators) ? decorators.flatMap(decorator => decoratorConfig[decorator]) : [],
          annotations: hasArrayValues(annotations)
            ? annotations.flatMap(annotation => annotationConfig[annotation])
            : [],
        },
      }),
      ...(includeHorizontalRule ? [horizontalRule] : []),
      ...(additionalSchemas || []),
    ],
    ...props,
  });

export default defineRichText;
