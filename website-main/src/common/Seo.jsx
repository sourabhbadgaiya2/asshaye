// import React from "react";
// import { Helmet } from "react-helmet";

// const SEO = ({ title, description, keywords }) => (
//   <Helmet>
//     <title>{title}</title>
//     {description && <meta name='description' content={description} />}
//     {keywords && <meta name='keywords' content={keywords} />}
//   </Helmet>
// );

// export default SEO;

import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

function SEO({ title, description, keywords }) {

  const location = useLocation();
  const canonicalUrl = window.location.origin + location.pathname;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name='description' content={description} />}
      {keywords && <meta name='keywords' content={keywords} />}
      <link rel='canonical' href={canonicalUrl} />
    </Helmet>
  );
}

export default SEO;
