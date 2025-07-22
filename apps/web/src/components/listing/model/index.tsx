'use client';

import { type FC, useEffect } from 'react';

import BackgroundImage from 'molecules/backgroundImage';

import ModelCard from 'organisms/cards/model';
import Heading from 'organisms/heading';

import ModelFilters from 'components/listing/model/components/filters';
import ModelFilterHeadline from 'components/listing/model/components/headline';
import Searchbar from 'components/listing/model/components/searchbar';
import useFilteredBlogs from 'components/listing/model/hooks';
import { setModelTotalModels } from 'components/listing/model/store';

import type { modelListingFragment } from 'components/listing/model/query';
import type { InferFragmentType } from 'groqd';

export type ModelListingProps = InferFragmentType<typeof modelListingFragment>;

const ModelListing: FC<ModelListingProps> = ({ models, totalModels, modelTypes, providers, heading }) => {
  const cards = useFilteredBlogs(models, totalModels);

  useEffect(() => {
    setModelTotalModels(totalModels);
  }, [totalModels]);

  return (
    <div className="flex flex-col gap-10">
      <div className="relative flex flex-col items-center gap-8 p-4 pt-12 sm:px-8 sm:py-16 lg:py-18">
        <BackgroundImage image="texture-1" className="rounded-2xl" />
        <Heading {...heading} alignment="center" headingTag="h1" size="xl" className="relative z-10" />
        <Searchbar />
      </div>
      <div id="listing-section" className="flex flex-col gap-8 lg:gap-10">
        <div className="flex w-full flex-row-reverse items-center justify-between gap-8 sm:flex-col sm:items-start lg:gap-10">
          <ModelFilters modelTypes={modelTypes} providers={providers} />
          <ModelFilterHeadline />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {cards.map(card => (
            <ModelCard key={card._id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelListing;
