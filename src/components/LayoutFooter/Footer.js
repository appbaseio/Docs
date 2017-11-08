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
            <FooterLink to="/getting-started">Quick Start</FooterLink>
            <FooterLink to="/docs/basic-components">
              Basic Components
            </FooterLink>
            <FooterLink to="/docs/map-components">
              Map Components
            </FooterLink>
            <FooterLink to="/docs/search-components">
              Search Components
            </FooterLink>
            <FooterLink to="/docs/advanced">
              Advanced
            </FooterLink>
          </FooterNav>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>Community</MetaTitle>
            <ExternalFooterLink
              href="https://gitter.im/appbaseio/reactivesearch"
              target="_blank"
              rel="noopener">
              Chat on Gitter
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://slack.appbase.io/"
              target="_blank"
              rel="noopener">
              Join us on Slack
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://twitter.com/appbaseio"
              target="_blank"
              rel="noopener">
              Twitter
            </ExternalFooterLink>
          </FooterNav>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>Tools</MetaTitle>
            <ExternalFooterLink
              href="https://opensource.appbase.io/dejavu/"
              target="_blank"
              rel="noopener">
              DejaVu
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://opensource.appbase.io/mirage/"
              target="_blank"
              rel="noopener">
              Mirage
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://opensource.appbase.io/gem/"
              target="_blank"
              rel="noopener">
              Gem
            </ExternalFooterLink>
          </FooterNav>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>More</MetaTitle>
            <ExternalFooterLink
              href="https://medium.appbase.io/"
              target="_blank"
              rel="noopener">
              Blog
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://github.com/appbaseio"
              target="_blank"
              rel="noopener">
              GitHub
            </ExternalFooterLink>
          </FooterNav>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
