import localFont from 'next/font/local';

export const Aspekta = localFont({
  src: [
    {
      path: './Aspekta-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Aspekta-550.woff2',
      weight: '550',
      style: 'normal',
    },
    {
      path: './Aspekta-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Aspekta-900.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--aspekta',
});

export const Favorit = localFont({
  src: [
    {
      path: './favorit-mono.woff2',
      weight: '550',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--favorit',
});
