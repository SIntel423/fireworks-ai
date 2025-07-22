'use client';

import { useState } from 'react';

import { hasArrayValues } from '@packages/utils/src/arrays';

import ElementAnimation from 'molecules/elementAnimation';
import Heading from 'organisms/heading';
import Icon from 'molecules/icon';
import ImageCard from 'organisms/cards/image';

import type { FC } from 'react';
import type { InferFragmentType } from 'groqd';
import type { IconIds } from '@packages/ui/icons';

import { featuredBentoFragment } from './fragment';

type FeaturedBentoFragment = InferFragmentType<typeof featuredBentoFragment>;


// Helper function to truncate text content
const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Custom card component for collapsed state with truncated content
const CollapsedCard: FC<{ card: any }> = ({ card }) => {
  const { icon, content, title, link } = card;
  
  // Extract text from rich text content and truncate
  const getTextFromContent = (blocks: any[]) => {
    if (!blocks || blocks.length === 0) return '';
    return blocks
      .map(block => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .join(' ');
  };
  
  const textContent = content ? getTextFromContent(content) : '';
  const truncatedText = truncateText(textContent, 80);
  
  return (
    <div className="flex w-full flex-col gap-6 rounded-[10px] border border-neutrals-400 p-6 bg-image-card h-full">
      <div className="flex gap-4 flex-col">
        <h4 className="text-display-xs font-medium text-purple-400 flex gap-2">
          {icon && <Icon icon={icon as IconIds} size={24} className="text-purple-400" />}
          <span>{title}</span>
        </h4>
        {truncatedText && (
          <div className="text-lg text-black line-clamp-2 overflow-hidden">
            {truncatedText}
          </div>
        )}
        {((link as any)?.link?.href || (link as any)?.internalLink?.link) && (
          <div className="pt-4">
            <div className="flex justify-start">
              <div className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                <Icon icon="arrow-right" size={20} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Accordion card component for bottom row
const AccordionCard: FC<{
  card: any;
  isExpanded: boolean;
  onClick: () => void;
  index: number;
}> = ({ card, isExpanded, onClick, index }) => {
  const { featuredImage: _featuredImage, ...cardProps } = card as any;
  
  return (
    <div
      className={`cursor-pointer transition-all duration-300 h-full col-span-1 ${isExpanded ? 'lg:col-span-2' : 'lg:col-span-1'}`}
      onClick={onClick}
    >
      <ElementAnimation
        key={`bottom-card-${index + 1}`}
        animation="slideInBottom"
        delay={index * 100}
        className="h-full"
      >
        <div className="h-full">
          {isExpanded ? (
            <ImageCard {...cardProps} />
          ) : (
            <CollapsedCard card={card} />
          )}
        </div>
      </ElementAnimation>
    </div>
  );
};

const FeaturedBento: FC<FeaturedBentoFragment> = ({
  heading,
  topRowCards,
  bottomRowCards
}) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState(0);

  return (
    <div className="flex w-full flex-col gap-18 sm:gap-20 lg:gap-24">
      <Heading {...(heading as any)} alignment="left" size="lg" />
      <div className="flex w-full flex-col gap-6">
        {/* Top Row - Large Cards */}
        {hasArrayValues(topRowCards) && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(topRowCards as any[])?.map((card: any, index: number) => (
              <ElementAnimation
                key={`top-card-${index + 1}`}
                animation="slideInBottom"
                delay={index * 100}
                className="h-full"
              >
                <ImageCard {...card} />
              </ElementAnimation>
            ))}
          </div>
        )}
        
        {/* Bottom Row - Accordion Cards */}
        {hasArrayValues(bottomRowCards) && (
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-stretch">
            {(bottomRowCards as any[])?.slice(0, 5).map((card: any, index: number) => (
              <AccordionCard
                key={`bottom-card-${index + 1}`}
                card={card}
                isExpanded={expandedCardIndex === index}
                onClick={() => setExpandedCardIndex(index)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { featuredBentoFragment } from './fragment';
export default FeaturedBento;
