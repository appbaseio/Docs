import Container from 'components/Container';
import ExternalFooterLink from './ExternalFooterLink';
import FooterLink from './FooterLink';
import FooterNav from './FooterNav';
import MetaTitle from 'templates/components/MetaTitle';
import React from 'react';
import {colors, media} from 'theme';

const Footer = ({layoutHasSidebar = false}) => (
  <footer
    css={{
      backgroundColor: colors.darker,
      color: colors.white,
      paddingTop: 10,
      paddingBottom: 50,

      [media.size('sidebarFixed')]: {
        paddingTop: 40,
      },
    }}>
    <Container>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',

          [media.between('small', 'medium')]: {
            paddingRight: layoutHasSidebar ? 240 : null,
          },

          [media.between('large', 'largerSidebar')]: {
            paddingRight: layoutHasSidebar ? 280 : null,
          },
          [media.between('largerSidebar', 'sidebarFixed', true)]: {
            paddingRight: layoutHasSidebar ? 380 : null,
          },
        }}>
        <div
          css={{
            flexWrap: 'wrap',
            display: 'flex',
            width: '100%',
          }}>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>Docs</MetaTitle>
            <FooterLink to="/javascript/quickstart.html">Javascript Quick Start</FooterLink>
            <FooterLink to="/rest/getting-started.html">
              REST Quick Start
            </FooterLink>
            <ExternalFooterLink href="https://rest.appbase.io"
            target="_blank"
            rel="noopener">
              REST API Reference
            </ExternalFooterLink>
          </FooterNav>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>Community</MetaTitle>
            <ExternalFooterLink
              href="https://github.com/appbaseio/Docs/"
              target="_blank"
              rel="noopener">
              Github
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://slack.appbase.io/"
              target="_blank"
              rel="noopener">
              Slack
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://twitter.com/appbaseio"
              target="_blank"
              rel="noopener">
              Twitter
            </ExternalFooterLink>
          </FooterNav>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>Helpful Tools</MetaTitle>
            <ExternalFooterLink
              href="https://opensource.appbase.io/dejavu/"
              target="_blank"
              rel="noopener">
              Data browser
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://opensource.appbase.io/mirage/"
              target="_blank"
              rel="noopener">
              GUI Query Builder
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://opensource.appbase.io/reactivesearch/"
              target="_blank"
              rel="noopener">
              React UI Components
            </ExternalFooterLink>
          </FooterNav>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>More</MetaTitle>
            <ExternalFooterLink
              href="https://medium.appbase.io/"
              target="_blank"
              rel="noopener">
              Medium Publication
            </ExternalFooterLink>
            <ExternalFooterLink
              href="mailto:support@appbase.io"
              target="_blank"
              rel="noopener">
              Support Email
            </ExternalFooterLink>
          </FooterNav>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
