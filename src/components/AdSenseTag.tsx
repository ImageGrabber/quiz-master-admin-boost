import { Helmet } from "react-helmet-async";

const AdSenseTag = () => {
  const adClient = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  if (!adClient) return null;

  return (
    <Helmet>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
      />
    </Helmet>
  );
};

export default AdSenseTag;

