import { htmlToBlocks } from '@sanity/block-tools';
import jsdom from 'jsdom';

import defaultSchema from '../scripts/defaultSchema.js';
import uploadImage from '../scripts/uploadImage.js';

const { JSDOM } = jsdom;

export const blockContentType = defaultSchema.get('blogPost').fields.find(field => field.name === 'body').type;

const convertHTMLtoPortableText = async HTMLDoc => {
  const rules = [
    {
      deserialize: (el, _, block) => {
        if ('tagName' in el && el.tagName === 'HR') {
          return block({ _type: 'hr' });
        }

        return undefined;
      },
    },
    // Code block
    {
      deserialize(el, _, block) {
        if (el.tagName?.toLowerCase() !== 'pre') {
          return undefined;
        }

        const code = el.children[0],
          childNodes = code && code.tagName.toLowerCase() === 'code' ? code.childNodes : el.childNodes,
          language = code
            ?.getAttribute('class')
            ?.split(' ')
            ?.find(className => className.startsWith('language-'))
            ?.split('-')[1];

        let text = '';

        childNodes.forEach(node => {
          text += node.textContent;
        });

        return block({
          _type: 'code',
          code: text,
          language: language || 'text',
        });
      },
    },
    // Image
    {
      deserialize: (el, _, block) => {
        if ('tagName' in el && el.tagName === 'IMG') {
          const imageUrl = el.getAttribute('src'),
            imageAlt = el.getAttribute('alt');

          return block({ _type: 'richImage', asset: { _type: 'image', _ref: imageUrl }, alt: imageAlt });
        }

        return undefined;
      },
    },
    // Video
    // {
    //   deserialize: (el, _, block) => {
    //     if ('tagName' in el && el.tagName === 'A') {
    //       const videoUrl = el.getAttribute('href');

    //       if (videoUrl.startsWith('http')) {
    //         return undefined;
    //       }

    //       return block({ _type: 'video', videoId: videoUrl });
    //     }

    //     return undefined;
    //   },
    // },
    // Table
    {
      deserialize: (el, _, block) => {
        if ('tagName' in el && el.tagName === 'TABLE') {
          // Get thead element
          const thead = el.querySelector('thead');
          if (!thead) {
            console.log('No thead found');

            return undefined;
          }

          // Get column headings
          const headingRow = thead.querySelector('tr');
          if (!headingRow) {
            console.log('No heading row found');

            return undefined;
          }

          const columnHeadings = Array.from(headingRow.querySelectorAll('th')).map(th => ({
            _type: 'columnHeading',
            label: th.textContent?.trim() || '',
          }));

          // Get table body rows
          const tbody = el.querySelector('tbody');
          if (!tbody) {
            console.log('No tbody found');

            return undefined;
          }

          const rows = Array.from(tbody.querySelectorAll('tr')).map(tr => ({
            _type: 'tableRow',
            cells: Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim() || ''),
          }));

          return block({
            _type: 'table',
            columnHeadings,
            table: {
              _type: 'table',
              rows,
            },
          });
        }

        return undefined;
      },
    },
  ];

  const blocks = htmlToBlocks(HTMLDoc, blockContentType, {
    rules,
    parseHtml: html => new JSDOM(html).window.document,
  });

  await Promise.all(
    blocks.map(async block => {
      if (block._type === 'richImage' && block.asset._ref) {
        const uploadedImageId = await uploadImage(block.asset._ref);

        if (!uploadedImageId) {
          console.log('no image in convertHtml', block.asset._ref);
        }

        block.asset._ref = uploadedImageId?._id || block.asset._ref;
      }
    }),
  );

  return blocks;
};

export default convertHTMLtoPortableText;
