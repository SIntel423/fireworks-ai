import Link from 'next/link';

import { SITE_DOMAIN } from 'constants/general';

import type { ElementType } from 'react';

const protocols = ['http:', 'https:', 'mailto:', 'tel:'];
export const internalDomains = [SITE_DOMAIN, `www.${SITE_DOMAIN}`] as const;

/**
 * Checks if the given URL starts with any of the URL prefix constants.
 *
 * @param url - The URL to check.
 * @returns `true` if the URL starts with any of the URL prefix constants, `false` otherwise.
 */
export const hasPrefixConstant = (url: string) => protocols.some(prefix => url.toLowerCase().startsWith(prefix));

/**
 * Checks if the given URL is an internal link, based on the `internalDomains` list.
 *
 * @param url - The URL to check.
 * @returns `true` if the URL is an internal link, `false` otherwise.
 */
export const isInternalLink = (url: URL) => internalDomains.some(domain => url.hostname === domain);

/**
 * Checks if the provided value is a valid absolute url.
 * Valid url protocols are: http, https, mailto, tel.
 *
 * @param url string - The value to check.
 * @returns `true` if `url` has a valid url protocol, otherwise `false`.
 */
export const isAbsoluteUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    return hasPrefixConstant(parsedUrl.protocol);
  } catch {
    return false;
  }
};

/**
 * Checks if the provided URL string is a relative URL.
 * A relative URL is defined as a URL that starts with a forward slash (`/`).
 *
 * @param url - The URL string to check.
 * @returns `true` if the URL is a relative URL, `false` otherwise.
 */
export const isRelativeUrl = (url: string) => {
  try {
    if (url.charAt(0) !== '/') {
      return false;
    }

    new URL(`https://${internalDomains[0]}${url}`);

    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if the provided URL string is a relative anchor link.
 * A relative anchor link is defined as a URL that starts with a hash (`#`).
 *
 * @param url - The URL string to check.
 * @returns `true` if the URL is a relative anchor link, `false` otherwise.
 */
export const isRelativeAnchorLink = (url: string) => url.trim().startsWith('#') && url.trim().length > 1;

/**
 * Ensures a URL path starts with a forward slash.
 * If the path already starts with a slash, it is returned as-is.
 *
 * @param path - The URL path to check.
 * @returns The path with a leading forward slash.
 */
export const ensureLeadingSlash = (path: string): string => {
  if (!path) {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * Converts a URL string to a URL object.
 *
 * @param url - The URL string to convert.
 * @returns A URL object representing the input URL string.
 * @throws {Error} If the input URL string is invalid.
 */
export const getUrlObject = (url?: string | undefined | null) => {
  if (!url) {
    return undefined;
  }

  if (isRelativeUrl(url) || isRelativeAnchorLink(url)) {
    url = `https://${internalDomains[0]}${url}`;
  }

  try {
    return new URL(url);
  } catch {
    return undefined;
  }
};

/**
 * Parses a URL string and returns an object with information about the URL.
 *
 * @param href - The URL string to parse.
 * @returns An object with the following properties:
 *   - Component: The appropriate React component to use for the URL ('Link' for internal URLs, 'a' for external URLs).
 *   - rel: The 'rel' attribute for the link ('noreferrer noopener' for external URLs, empty string for internal URLs).
 *   - target: The 'target' attribute for the link ('_blank' for external URLs, empty string for internal URLs).
 *   - href: The URL path (without the domain) for internal URLs, or the full URL for external URLs.
 */
const parseUrl = (href?: string | undefined | null, fallback?: ElementType) => {
  const url = getUrlObject(href);

  if (!url || !href) {
    return {
      as: fallback || 'span',
      href: null,
    } as const;
  }

  const isInternal = isInternalLink(url),
    isPageHash = isRelativeAnchorLink(href),
    link = isInternal ? url.href.split(url.host)[1] : href;

  if (link === '') {
    return {
      as: fallback || 'span',
      href: null,
    } as const;
  }

  return {
    as: isInternal ? Link : 'a',
    rel: isInternal ? '' : 'noreferrer noopener',
    target: isInternal ? '' : '_blank',
    href: isPageHash ? url.hash : link,
  } as const;
};

export default parseUrl;
