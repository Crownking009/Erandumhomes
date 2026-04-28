import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogImage, 
  ogType = 'website',
  keywords
}: SEOProps) {
  const siteName = 'Erandum Homes';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Premium short-lets, luxury apartments, and exclusive homes in Lagos. Erandum Homes provides top-tier property management and vacation management services.';
  const metaDescription = description || defaultDescription;
  const siteUrl = 'https://erandumhomes.com'; // Placeholder base URL
  const metaKeywords = keywords || 'real estate lagos, short let lekki, luxury apartments nigeria, property management lagos, erandum homes, short let victoria island';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={siteName} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Accessibility / Theme */}
      <meta name="theme-color" content="#1a202c" />
    </Helmet>
  );
}
