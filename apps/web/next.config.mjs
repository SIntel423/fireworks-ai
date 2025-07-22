// @ts-check
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import fetchRedirects from './src/utils/redirect.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  transpilePackages: ['ui', 'utils'],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
      ],
    },
    {
      source: '/icons/sprites.svg',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self' https://fireworks-ai-studio-ten.vercel.app",
        },
      ],
    },
  ],
  redirects: async () => {
    const sanityRedirects = await fetchRedirects();

    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      ...sanityRedirects.map(({ from, to, params, permanent }) => ({
        source: from,
        destination: to,
        has: [...(params || []).map(param => ({ type: 'query', key: param, value: param }))],
        permanent: !!permanent,
      })),
    ];
  },
};

export default nextConfig;
