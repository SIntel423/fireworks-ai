'use client';

import { useState } from 'react';

import Icon from 'molecules/icon';

import Testimonial from 'organisms/cards/testimonial';

import type { TestimonialFragment } from 'organisms/testimonial';
import type { FC } from 'react';

import 'components/testimonials/components/Carousel/styles.css';

export interface CarouselProps {
  slides: TestimonialFragment[];
  noPageDots?: boolean;
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create extended slides array for infinite effect
  const extendedSlides = [...slides, ...slides, ...slides];
  const startIndex = slides.length; // Start at the middle set

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);

    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(prev => {
        if (prev <= 0) return slides.length;

        return prev;
      });
    }, 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);

    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(prev => {
        if (prev >= slides.length * 2 - 1) return slides.length - 1;

        return prev;
      });
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setCurrentIndex(startIndex + index);
  };

  const displayIndex = startIndex + currentIndex;

  return (
    <div className="relative flex w-full flex-col items-center gap-9">
      {/* Carousel container */}
      <div className="relative mx-auto w-full overflow-hidden">
        <div className="mask-horizontal h-full w-full">
          <div className="flex w-full justify-center">
            <div
              className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-out' : 'transition-transform duration-300 ease-out'}`}
              style={{ transform: `translateX(calc(50% - ${displayIndex * (627 + 24) + 313.5}px))` }}
            >
              {extendedSlides.map((slide, index) => (
                <div key={`${slide._id}-${index % slides.length}`} className="w-[627px] flex-shrink-0">
                  <Testimonial {...slide} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-12">
        <button
          onClick={goToPrevious}
          className="group cursor-pointer rounded p-0.5 transition-all duration-200 hover:bg-purple-25"
          disabled={isTransitioning}
        >
          <Icon icon="arrow-left" size={24} className="transition-colors duration-200 group-hover:text-purple-600" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              className={`size-3 cursor-pointer rounded-full transition-opacity ${
                currentIndex % slides.length === index ? 'bg-purple-600' : 'bg-purple-25'
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="group cursor-pointer rounded p-0.5 transition-all duration-200 hover:bg-purple-25"
          disabled={isTransitioning}
        >
          <Icon icon="arrow-right" size={24} className="transition-colors duration-200 group-hover:text-purple-600" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
