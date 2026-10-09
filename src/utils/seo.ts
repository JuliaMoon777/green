export type SeoRouteKey = 'home' | 'about-us';

export interface RouteSeoMetadata {
  key: SeoRouteKey;
  path: '/' | '/about-us';
  lang: 'pl' | 'en';
  ogLocale: string;
  title: string;
  description: string;
  ogType: 'website';
}

export interface ResolvedPageSeo extends RouteSeoMetadata {
  siteName: string;
  canonicalUrl: string | null;
  ogUrl: string | null;
  ogImageUrl: string | null;
  ogImageAlt: string | null;
  twitterCard: 'summary' | 'summary_large_image';
}

export const SITE_NAME = 'GREENERGY';

export const GREENERGY_LOGO_PATH = '/products/brand/greenergy-logo.png';

export const GREENERGY_INSTAGRAM_URL =
  'https://www.instagram.com/my_greenergy';

export const GREENERGY_ORGANIZATION_DESCRIPTION =
  'GREENERGY creates natural snacks that combine carefully selected ingredients with delicious flavors, offering an enjoyable alternative to conventional snacking.';

export const DEFAULT_SEO_TITLE =
  'GREENERGY Natural Snacks | Fava Beans, Chickpea Snacks & Protein Cookies';

export const DEFAULT_SEO_DESCRIPTION =
  'Discover GREENERGY natural snacks, including Fava Beans Chips, Chickpea Protein Snacks and Protein Cookies. Explore delicious flavors and our approach to better snacking.';

export const SEO_ROUTES: Record<SeoRouteKey, RouteSeoMetadata> = {
  home: {
    key: 'home',
    path: '/',
    lang: 'pl',
    ogLocale: 'en_US',
    title:
      'GREENERGY Natural Snacks | Fava Beans, Chickpea Snacks & Protein Cookies',
    description:
      'Discover GREENERGY natural snacks, including Fava Beans Chips, Chickpea Protein Snacks and Protein Cookies. Explore delicious flavors and our approach to better snacking.',
    ogType: 'website',
  },
  'about-us': {
    key: 'about-us',
    path: '/about-us',
    lang: 'en',
    ogLocale: 'en_US',
    title: 'About GREENERGY | Natural Snacks Without Compromising on Taste',
    description:
      'Learn about GREENERGY, our passion for natural ingredients, simple recipes and delicious snacks. Discover our philosophy and commitment to great taste.',
    ogType: 'website',
  },
};

const DISALLOWED_PREVIEW_HOST_PATTERNS = [
  /\.vercel\.app$/i,
  /\.run\.app$/i,
  /\.netlify\.app$/i,
  /\.ngrok(-free)?\.app$/i,
  /\.ngrok\.io$/i,
  /^localhost$/i,
  /^127\.\d+\.\d+\.\d+$/,
  /^0\.0\.0\.0$/,
  /^example\.com$/i,
  /^www\.example\.com$/i,
];

const PLACEHOLDER_ENV_VALUES = new Set([
  '',
  'my_app_url',
  'your_site_url',
  'your_production_domain',
  'https://your-domain.com',
  'https://example.com',
  'undefined',
  'null',
]);

/**
 * Validates and normalizes an official HTTPS production base URL.
 * Rejects temporary preview domains (.vercel.app, .run.app), localhost, HTTP URLs, and placeholders.
 * Returns a normalized origin string without trailing slash (e.g., "https://greenergy.eu"), or null if unconfigured/invalid.
 */
export function resolveProductionSiteUrl(rawUrl?: string): string | null {
  const envUrl =
    rawUrl !== undefined
      ? rawUrl
      : (
          import.meta as unknown as {
            env?: Record<string, string | undefined>;
          }
        ).env?.VITE_SITE_URL;

  if (!envUrl || typeof envUrl !== 'string') {
    return null;
  }

  const trimmed = envUrl.trim();
  if (PLACEHOLDER_ENV_VALUES.has(trimmed.toLowerCase())) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') {
      return null;
    }

    const hostname = parsed.hostname.toLowerCase();
    if (
      DISALLOWED_PREVIEW_HOST_PATTERNS.some((pattern) => pattern.test(hostname))
    ) {
      return null;
    }

    // Normalize base path (strip trailing slashes, query parameters, and hash fragments)
    const cleanPath = parsed.pathname.replace(/\/+$/, '');
    return `${parsed.origin}${cleanPath}`;
  } catch {
    return null;
  }
}

/**
 * Builds a clean, normalized canonical URL for a specific route path.
 * - Homepage ('/') normalizes to `https://<domain>/`
 * - Subpages ('/about-us') normalize without trailing slash: `https://<domain>/about-us`
 * - Never includes query parameters, tracking parameters, or hashes.
 */
export function buildCanonicalUrl(
  routePath: '/' | '/about-us',
  rawBaseUrl?: string
): string | null {
  const baseUrl = resolveProductionSiteUrl(rawBaseUrl);
  if (!baseUrl) {
    return null;
  }

  const normalizedPath =
    routePath === '/' ? '/' : `/${routePath.replace(/^\/+|\/+$/g, '')}`;

  return normalizedPath === '/' ? `${baseUrl}/` : `${baseUrl}${normalizedPath}`;
}

/**
 * Resolves a verified absolute HTTPS production URL for the Open Graph / Twitter sharing image.
 * Returns null if no approved social sharing image is configured, preventing broken or temporary URLs.
 */
export function resolveVerifiedSocialImage(
  rawBaseUrl?: string,
  rawImageUrlParam?: string,
  rawImageAltParam?: string
): {
  url: string;
  alt: string;
} | null {
  const env = (
    import.meta as unknown as {
      env?: Record<string, string | undefined>;
    }
  ).env;

  const rawImageUrl = (
    rawImageUrlParam !== undefined ? rawImageUrlParam : env?.VITE_OG_IMAGE_URL
  )?.trim();
  if (!rawImageUrl || PLACEHOLDER_ENV_VALUES.has(rawImageUrl.toLowerCase())) {
    return null;
  }

  const defaultAlt =
    (
      rawImageAltParam !== undefined ? rawImageAltParam : env?.VITE_OG_IMAGE_ALT
    )?.trim() ||
    'GREENERGY Natural Snacks — Fava Beans Chips, Chickpea Protein Snacks & Protein Cookies';

  // If a relative asset path is configured, it requires a verified production base URL
  if (rawImageUrl.startsWith('/')) {
    const baseUrl = resolveProductionSiteUrl(rawBaseUrl);
    if (!baseUrl) {
      return null;
    }
    return {
      url: `${baseUrl}${rawImageUrl}`,
      alt: defaultAlt,
    };
  }

  try {
    const parsed = new URL(rawImageUrl);
    if (parsed.protocol !== 'https:') {
      return null;
    }
    const hostname = parsed.hostname.toLowerCase();
    if (
      DISALLOWED_PREVIEW_HOST_PATTERNS.some((pattern) => pattern.test(hostname))
    ) {
      return null;
    }
    parsed.search = '';
    parsed.hash = '';
    return {
      url: parsed.toString(),
      alt: defaultAlt,
    };
  } catch {
    return null;
  }
}

/**
 * Resolves the complete SEO metadata object for a given route key.
 */
export function getPageSeoMetadata(
  routeKey: SeoRouteKey,
  rawBaseUrl?: string
): ResolvedPageSeo {
  const routeConfig = SEO_ROUTES[routeKey] || SEO_ROUTES.home;
  const canonicalUrl = buildCanonicalUrl(routeConfig.path, rawBaseUrl);
  const socialImage = resolveVerifiedSocialImage(rawBaseUrl);

  return {
    ...routeConfig,
    siteName: SITE_NAME,
    canonicalUrl,
    ogUrl: canonicalUrl,
    ogImageUrl: socialImage ? socialImage.url : null,
    ogImageAlt: socialImage ? socialImage.alt : null,
    twitterCard: socialImage ? 'summary_large_image' : 'summary',
  };
}

function upsertMetaTag(
  attrName: 'name' | 'property',
  attrValue: string,
  content: string | null
): void {
  if (typeof document === 'undefined') return;

  const selector = `meta[${attrName}="${attrValue}"]`;
  const existingTags = Array.from(
    document.head.querySelectorAll<HTMLMetaElement>(selector)
  );

  if (content === null || content.trim() === '') {
    existingTags.forEach((tag) => tag.remove());
    return;
  }

  const [primaryTag, ...duplicateTags] = existingTags;
  duplicateTags.forEach((tag) => tag.remove());

  if (primaryTag) {
    if (primaryTag.getAttribute('content') !== content) {
      primaryTag.setAttribute('content', content);
    }
    return;
  }

  const meta = document.createElement('meta');
  meta.setAttribute(attrName, attrValue);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function upsertCanonicalLink(canonicalUrl: string | null): void {
  if (typeof document === 'undefined') return;

  const existingLinks = Array.from(
    document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')
  );

  if (!canonicalUrl) {
    existingLinks.forEach((link) => link.remove());
    return;
  }

  const [primaryLink, ...duplicateLinks] = existingLinks;
  duplicateLinks.forEach((link) => link.remove());

  if (primaryLink) {
    if (primaryLink.getAttribute('href') !== canonicalUrl) {
      primaryLink.setAttribute('href', canonicalUrl);
    }
    return;
  }

  const link = document.createElement('link');
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', canonicalUrl);
  document.head.appendChild(link);
}

/**
 * Generates a valid production robots.txt file.
 * Appends the absolute Sitemap URL only when a verified HTTPS production domain is configured.
 */
export function buildRobotsTxt(rawBaseUrl?: string): string {
  const baseUrl = resolveProductionSiteUrl(rawBaseUrl);
  const lines = ['User-agent: *', 'Allow: /'];

  if (baseUrl) {
    lines.push('', `Sitemap: ${baseUrl}/sitemap.xml`);
  }

  return `${lines.join('\n')}\n`;
}

/**
 * Generates a valid XML Sitemap according to the Sitemap Protocol 0.9.
 * Includes only existing, public, indexable routes ('/' and '/about-us') with canonical HTTPS URLs.
 * Never invents a domain, <lastmod>, <priority>, or <changefreq>.
 */
export function buildSitemapXml(rawBaseUrl?: string): string {
  const baseUrl = resolveProductionSiteUrl(rawBaseUrl);
  if (!baseUrl) {
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      '  <!-- Official production domain (VITE_SITE_URL) is required to populate canonical <loc> entries for / and /about-us -->',
      '</urlset>',
      '',
    ].join('\n');
  }

  const publicRoutes: Array<'/' | '/about-us'> = ['/', '/about-us'];
  const urlEntries = publicRoutes
    .map((routePath) => {
      const loc = buildCanonicalUrl(routePath, baseUrl);
      return loc ? `  <url>\n    <loc>${loc}</loc>\n  </url>` : null;
    })
    .filter((entry): entry is string => Boolean(entry));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries,
    '</urlset>',
    '',
  ].join('\n');
}

/**
 * Builds valid Schema.org JSON-LD structured data for the active route:
 * - Homepage ('home'): Organization + WebSite + WebPage
 * - About Us ('about-us'): Organization + WebSite + AboutPage
 * Uses canonical HTTPS URLs when VITE_SITE_URL is configured, or valid root-relative IRIs otherwise.
 */
export function buildPageJsonLd(
  routeKey: SeoRouteKey,
  rawBaseUrl?: string
): Record<string, unknown> {
  const baseUrl = resolveProductionSiteUrl(rawBaseUrl);
  const withBase = (relativePath: string): string =>
    baseUrl ? `${baseUrl}${relativePath}` : relativePath;

  const homeUrl = withBase('/');
  const aboutUrl = withBase('/about-us');
  const orgId = withBase('/#organization');
  const websiteId = withBase('/#website');
  const logoId = withBase('/#logo');
  const logoUrl = withBase(GREENERGY_LOGO_PATH);

  const organizationEntity = {
    '@type': 'Organization',
    '@id': orgId,
    name: SITE_NAME,
    url: homeUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': logoId,
      url: logoUrl,
      contentUrl: logoUrl,
      caption: SITE_NAME,
    },
    description: GREENERGY_ORGANIZATION_DESCRIPTION,
    sameAs: [GREENERGY_INSTAGRAM_URL],
  };

  const websiteEntity = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: homeUrl,
    name: SITE_NAME,
    description: SEO_ROUTES.home.description,
    inLanguage: ['pl', 'en'],
    publisher: {
      '@id': orgId,
    },
  };

  if (routeKey === 'about-us') {
    const aboutRoute = SEO_ROUTES['about-us'];
    const aboutPageEntity = {
      '@type': 'AboutPage',
      '@id': `${aboutUrl}#aboutpage`,
      url: aboutUrl,
      name: aboutRoute.title,
      description: aboutRoute.description,
      inLanguage: aboutRoute.lang,
      isPartOf: {
        '@id': websiteId,
      },
      about: {
        '@id': orgId,
      },
      mainEntity: {
        '@id': orgId,
      },
    };

    return {
      '@context': 'https://schema.org',
      '@graph': [organizationEntity, websiteEntity, aboutPageEntity],
    };
  }

  const homeRoute = SEO_ROUTES.home;
  const webPageEntity = {
    '@type': 'WebPage',
    '@id': withBase('/#webpage'),
    url: homeUrl,
    name: homeRoute.title,
    description: homeRoute.description,
    inLanguage: homeRoute.lang,
    isPartOf: {
      '@id': websiteId,
    },
    about: {
      '@id': orgId,
    },
    publisher: {
      '@id': orgId,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organizationEntity, websiteEntity, webPageEntity],
  };
}

/**
 * Safely serializes a JSON-LD object into a string while escaping HTML characters
 * (<, >, &) to prevent script-tag injection.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

function upsertJsonLdScript(
  routeKey: SeoRouteKey,
  rawBaseUrl?: string
): void {
  if (typeof document === 'undefined') return;

  const jsonLdString = serializeJsonLd(buildPageJsonLd(routeKey, rawBaseUrl));
  const existingScripts = Array.from(
    document.head.querySelectorAll<HTMLScriptElement>(
      'script[type="application/ld+json"]'
    )
  );

  const [primaryScript, ...duplicateScripts] = existingScripts;
  duplicateScripts.forEach((el) => el.remove());

  if (primaryScript) {
    primaryScript.id = 'greenergy-jsonld';
    if (primaryScript.textContent !== jsonLdString) {
      primaryScript.textContent = jsonLdString;
    }
    return;
  }

  const script = document.createElement('script');
  script.id = 'greenergy-jsonld';
  script.type = 'application/ld+json';
  script.textContent = jsonLdString;
  document.head.appendChild(script);
}

/**
 * Synchronizes document title, meta description, canonical link, Open Graph tags,
 * Twitter/X card metadata, Schema.org JSON-LD, and document `<html lang>` for the active page.
 * Ensures zero duplicate tags across route transitions.
 */
export function applyPageSeo(routeKey: SeoRouteKey): ResolvedPageSeo {
  const seo = getPageSeoMetadata(routeKey);

  if (typeof document === 'undefined') {
    return seo;
  }

  // 1. Primary Document Language
  document.documentElement.lang = seo.lang;

  // 2. Deduplicate any stray <title> tags and set active page title
  const titleElements = Array.from(document.head.querySelectorAll('title'));
  if (titleElements.length > 1) {
    titleElements.slice(1).forEach((el) => el.remove());
  }
  document.title = seo.title;

  // 3. Remove any obsolete meta keywords tags if present
  document.head
    .querySelectorAll('meta[name="keywords"]')
    .forEach((el) => el.remove());

  // 4. Primary Meta Description
  upsertMetaTag('name', 'description', seo.description);

  // 5. Canonical Link (only emitted when official HTTPS production domain is configured)
  upsertCanonicalLink(seo.canonicalUrl);

  // 6. Open Graph Metadata
  upsertMetaTag('property', 'og:type', seo.ogType);
  upsertMetaTag('property', 'og:site_name', seo.siteName);
  upsertMetaTag('property', 'og:title', seo.title);
  upsertMetaTag('property', 'og:description', seo.description);
  upsertMetaTag('property', 'og:locale', seo.ogLocale);
  upsertMetaTag('property', 'og:url', seo.ogUrl);
  upsertMetaTag('property', 'og:image', seo.ogImageUrl);
  upsertMetaTag('property', 'og:image:alt', seo.ogImageAlt);

  // 7. Twitter / X Card Metadata
  upsertMetaTag('name', 'twitter:card', seo.twitterCard);
  upsertMetaTag('name', 'twitter:title', seo.title);
  upsertMetaTag('name', 'twitter:description', seo.description);
  upsertMetaTag('name', 'twitter:image', seo.ogImageUrl);
  upsertMetaTag('name', 'twitter:image:alt', seo.ogImageAlt);

  // 8. Schema.org JSON-LD Structured Data
  upsertJsonLdScript(routeKey);

  return seo;
}
