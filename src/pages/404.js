import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import React from 'react';
import {sharedStyles} from 'theme';

const PageNotFound = () => (
  <Container>
    <div css={sharedStyles.articleLayout.container}>
      <div css={sharedStyles.articleLayout.content}>
        <Header>Page Not Found</Header>
        <TitleAndMetaTags title="Reactive Manual - Page Not Found" />
        <div css={sharedStyles.markdown}>
          <p>We couldn't find what you were looking for.</p>
        </div>
      </div>
    </div>
  </Container>
);

export default PageNotFound;
