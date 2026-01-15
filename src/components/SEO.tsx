import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
}

const SEO = ({
  title = 'Bible Quiz Competition | Weekly Online Bible Quizzes',
  description = 'Join weekly Bible quizzes, host live sessions, and climb the leaderboard. Free to join, fun for all ages.',
  image,
  url,
  type = 'website',
  structuredData,
  children
}: SEOProps) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://biblequizcompetition.com';
  const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/sword.png`;

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bible Quiz Competition',
    url: siteUrl,
    logo: `${siteUrl}/sword.png`,
    sameAs: [
      'https://www.facebook.com/',
      'https://twitter.com/'
    ]
  };

  const schema = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content="Bible Quiz Competition" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      {children}
    </Helmet>
  );
};

export default SEO;


