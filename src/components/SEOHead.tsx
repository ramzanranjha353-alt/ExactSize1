import { useEffect } from 'react';
import { SEOPageData } from '../data/seoPagesData';

interface SEOHeadProps {
  pageData?: SEOPageData | null;
  canonicalPath?: string;
  isNotFound?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ pageData, canonicalPath = '/', isNotFound = false }) => {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://exactsize.app';
    const currentUrl = `${origin}${canonicalPath}`;

    let title = 'ExactSize – Compress Image & PDF to Exact Size';
    let description =
      'Compress images and PDFs to exact target file sizes (50KB, 100KB, 200KB, 500KB, 1MB) privately in your browser. 100% client-side, lightning fast, and zero file uploads.';

    if (isNotFound) {
      title = 'Page Not Found | ExactSize';
      description = 'The requested file compression tool could not be found. Browse all available image and PDF exact size compressors on ExactSize.';
    } else if (pageData) {
      title = pageData.title;
      description = pageData.metaDescription;
    }

    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', isNotFound ? origin : currentUrl, true);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', isNotFound ? origin : currentUrl);

    // Update or Insert JSON-LD Structured Data
    if (!isNotFound) {
      const graph: any[] = [
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: 'ExactSize',
          description: 'Compress images and PDFs to exact target file sizes in your browser.',
          inLanguage: 'en-US',
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${origin}${pageData ? pageData.slug : ''}#software`,
          name: pageData ? `${pageData.h1} Tool` : 'ExactSize Online Compressor',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'All modern web browsers',
          browserRequirements: 'Requires JavaScript & HTML5 Canvas',
          description: description,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      ];

      if (pageData) {
        const categoryLabel = pageData.fileType === 'image' ? 'Image Tools' : 'PDF Tools';
        const categoryAnchor = pageData.fileType === 'image' ? '/#popular-tools' : '/#popular-tools';

        graph.push({
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: categoryLabel,
              item: `${origin}${categoryAnchor}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: pageData.h1,
              item: currentUrl,
            },
          ],
        });

        if (pageData.faqs && pageData.faqs.length > 0) {
          graph.push({
            '@type': 'FAQPage',
            mainEntity: pageData.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          });
        }
      }

      const schemaObj = {
        '@context': 'https://schema.org',
        '@graph': graph,
      };

      let scriptTag = document.getElementById('exactsize-dynamic-jsonld') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'exactsize-dynamic-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaObj, null, 2);
    }
  }, [pageData, canonicalPath, isNotFound]);

  return null;
};
