import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import React from 'react';
import {sharedStyles} from 'theme';

const PageNotFound = () => (
  <Container>
    <div css={sharedStyles.articleLayout.container}>
      <div css={sharedStyles.articleLayout.content}>
        <Header>404!</Header>
        <TitleAndMetaTags title="Appbase.io Docs - 404, Page Not Found" />
        <div css={sharedStyles.markdown}>
          <p>Sorry, but the page you were trying to view does not exist.
          </p>
        </div>
      </div>
    </div>
  </Container>
);

export default PageNotFound;
