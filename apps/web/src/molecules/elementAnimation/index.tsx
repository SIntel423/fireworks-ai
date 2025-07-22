'use client';

import { cva } from 'class-variance-authority';
import { useInView } from 'framer-motion';
import { Children, cloneElement, useEffect, useRef, useState } from 'react';

import customTwMerge from 'utils/twMerge';

import type { VariantProps } from 'class-variance-authority';
import type { FC, ReactElement, ReactNode } from 'react';

interface ElementAnimationProps extends VariantProps<typeof animationVariants> {
  children: ReactNode;
  className?: string;
  onLoad?: boolean;
  delay?: number;
  asChild?: boolean;
}

const animationVariants = cva(
  'w-full transform-gpu contain-paint backface-hidden transform-3d data-[animate=false]:opacity-0',
  {
    variants: {
      animation: {
        slideInTop: 'data-[animate=true]:animate-slide-in-top',
        slideInRight: 'data-[animate=true]:animate-slide-in-right',
        slideInBottom: 'data-[animate=true]:animate-slide-in-bottom',
        slideInLeft: 'data-[animate=true]:animate-slide-in-left',
        fadeIn: 'data-[animate=true]:animate-fade-in',
        fadeInSlow: 'data-[animate=true]:animate-fade-in-slow',
      },
    },
  },
);

const ElementAnimation: FC<ElementAnimationProps> = ({
  children,
  animation,
  className,
  onLoad,
  delay = 0,
  asChild,
}) => {
  const ref = useRef<HTMLDivElement>(null),
    [show, setShow] = useState(false),
    isInView = useInView(ref, {
      once: true,
      amount: 0.4,
      initial: !!onLoad,
    });

  useEffect(() => {
    const el = ref.current;
    if (!isInView || !el) return;

    el.style.willChange = 'transform, opacity';

    const showTimeout = setTimeout(() => {
      setShow(isInView);
    }, delay);

    const viewTimeout = setTimeout(() => {
      el.style.removeProperty('will-change');
    }, delay + 1000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(viewTimeout);
    };
  }, [isInView]);

  const animationClasses = customTwMerge(animationVariants({ animation }), className);

  if (asChild) {
    const child = Children.only(children) as ReactElement<{
      className?: string;
      ref?: React.Ref<HTMLElement>;
      'data-animate'?: boolean;
    }>;

    return cloneElement(child, {
      ref,
      className: customTwMerge(child.props.className, animationClasses),
      'data-animate': show,
    });
  }

  return (
    <div ref={ref} className={animationClasses} data-animate={show}>
      {children}
    </div>
  );
};

export default ElementAnimation;
