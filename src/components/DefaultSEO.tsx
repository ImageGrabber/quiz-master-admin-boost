import { Helmet } from 'react-helmet-async';

const DefaultSEO = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://biblequizcompetition.com';
  const title = 'Bible Quiz Competition | Weekly Online Bible Quizzes';
  const description = 'Join weekly Bible quizzes, host live sessions, and climb the leaderboard. Free to join, fun for all ages.';
  const image = `${siteUrl}/sword.png`;

  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={siteUrl} />
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Bible Quiz Competition',
        url: siteUrl,
        logo: image,
        sameAs: [
          'https://www.facebook.com/',
          'https://twitter.com/'
        ]
      })}</script>
    </Helmet>
  );
};

export default DefaultSEO;


