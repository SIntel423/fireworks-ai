'use client';

import { useState } from 'react';
import { Controller, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';

import Icon from 'molecules/icon';

import ImageCard from 'organisms/cards/image';

import type { ImageCardFragment } from 'organisms/cards/image';
import type { FC } from 'react';

import 'components/testimonials/components/Carousel/styles.css';

import 'swiper/css';

export interface CarouselProps {
  slides: ImageCardFragment[];
  noPageDots?: boolean;
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass>();
  const [activeSlider, setActiveSlider] = useState(0)

  return (
    <div className="relative flex w-full flex-col items-center gap-9">
      <div className="relative mx-auto w-full overflow-hidden">
        <Swiper
          modules={[Controller, Navigation, Pagination]}
          controller={{ control: controlledSwiper }}
          onSwiper={swiper => setControlledSwiper(swiper)}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
          keyboard={{ enabled: true }}
          className="flex !px-2"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide._key}>
              <ImageCard {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation */}
      <div className="flex gap-12">
        <button
          onClick={() => {controlledSwiper?.slidePrev(), setActiveSlider(controlledSwiper?.activeIndex || 0)}}
          className="group btn-prev cursor-pointer rounded p-0.5 transition-all duration-200 hover:bg-purple-25"
        >
          <Icon icon="arrow-left" size={24} className="transition-colors duration-200 group-hover:text-purple-600" />
        </button>

        <div className="flex items-center gap-2 slider-pagination">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => {controlledSwiper?.slideTo(index), setActiveSlider(index)}}
              className={`size-3 cursor-pointer rounded-full transition-opacity ${
                activeSlider === index ? 'bg-purple-600' : 'bg-purple-25'
              } ${
                index === slides.length - 1 ? 'md:hidden' : ''
              } ${
                index === slides.length - 2 ? 'lg:hidden' : ''
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {controlledSwiper?.slideNext(), setActiveSlider(controlledSwiper?.activeIndex || 0)}}
          className="group btn-next cursor-pointer rounded p-0.5 transition-all duration-200 hover:bg-purple-25"
        >
          <Icon icon="arrow-right" size={24} className="transition-colors duration-200 group-hover:text-purple-600" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
