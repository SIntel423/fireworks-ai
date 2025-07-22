import { Highlight, themes } from 'prism-react-renderer';
import { twJoin } from 'tailwind-merge';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

type CodeFragment = InferFragmentType<typeof codeFragment>;

const Code: FC<CodeFragment> = ({ language, code }) =>
  code && (
    <Highlight language={language || 'typescript'} code={code} theme={themes.nightOwl}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <code className="relative">
          <pre className="font-robotoMono flex overflow-hidden rounded-xl bg-neutrals-900">
            <div className="flex flex-col border-r border-neutrals-600 bg-black p-6">
              {tokens.map((_, i) => (
                <span key={i} className="text-neutrals-500">
                  {i + 1}
                </span>
              ))}
            </div>
            <div
              className={twJoin(
                'flex scrollbar-hidden flex-col overflow-auto p-6',
                language === 'txt' && 'whitespace-normal',
              )}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} key={key} />
                  ))}
                </div>
              ))}
            </div>
          </pre>
        </code>
      )}
    </Highlight>
  );

export const codeFragment = q.fragment<FragmentAny>().project({
  _type: q.literal('code'),
  _key: q.string(),
  language: q.string().optional().nullable(),
  code: q.string().optional().nullable(),
});

export default Code;
