import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, keywords, canonical }) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name='description' content={description} />}
    {keywords && <meta name='keywords' content={keywords} />}
    {canonical && <link rel='canonical' href={canonical} />}
  </Helmet>
);

export default SEO;
