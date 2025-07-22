/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';

const HeadingHighlights = ({ heading }: { heading: string }) => {
  const strArr = heading.split(/(\{%.*?%\})/g),
    regex = /\{%|%\}/g;

  return (
    <>
      {strArr.map((str, i) => {
        const matches = regex.test(str),
          segment = str.replace(regex, '').trim();

        return matches ? (
          <span key={i} className="">
            {segment}
          </span>
        ) : (
          <Fragment key={i}>{str}</Fragment>
        );
      })}
    </>
  );
};

export default HeadingHighlights;
