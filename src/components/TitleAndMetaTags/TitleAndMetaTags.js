import Helmet from 'react-helmet';
import React from 'react';

const defaultDescription =
  'Data-driven components for building Maps and Search UIs';

type Props = {
  title: string,
  ogDescription: string,
  ogUrl: string,
};

const TitleAndMetaTags = ({title, ogDescription, ogUrl}: Props) => {
  return (
    <Helmet title={title}>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:image" content="/external.gif" />
      <meta
        property="og:description"
        content={ogDescription || defaultDescription}
      />
      <meta property="fb:app_id" content="623268441017527" />
    </Helmet>
  );
};

export default TitleAndMetaTags;
