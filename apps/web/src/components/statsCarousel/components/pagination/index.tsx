'use client';

import Button from 'molecules/button';

import { setNextStatsPage, setPreviousStatsPage } from 'components/statsCarousel/store';

const buttonStyle =
    'flex size-12 justify-center items-center rounded-full bg-neutrals-900 disabled:bg-gray/10 disabled:text-gray cursor-pointer',
  buttonProps = {
    iconPosition: 'start',
    hierarchy: 'primary',
    className: buttonStyle,
  } as const;

const StatCarouselPagination = () => (
  <div className="flex w-fit gap-4">
    <Button icon="arrow-left" onClick={setPreviousStatsPage} {...buttonProps} />
    <Button icon="arrow-right" onClick={setNextStatsPage} {...buttonProps} />
  </div>
);

export default StatCarouselPagination;
