import ButtonLink from './components/ButtonLink';
import Container from 'components/Container';
import Flex from 'components/Flex';
import SearchBox from 'components/SearchBox';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import {colors, media, sharedStyles} from 'theme';
import createOgUrl from 'utils/createOgUrl';

class Home extends Component {
  render() {
    const {data} = this.props;
    const title =
      'Appbase.io Docs';

    return (
      <div css={{width: '100%'}}>
        <TitleAndMetaTags
          title={title}
          ogUrl={createOgUrl(data.markdownRemark.fields.slug)}
        />
        <header
          css={{
            backgroundColor: colors.darker,
            color: colors.white,
          }}>
          <div
            css={{
              paddingTop: 30,
              paddingBottom: 20,

              [media.greaterThan('small')]: {
                paddingTop: 45,
                paddingBottom: 40,
              },

              [media.greaterThan('xlarge')]: {
                marginLeft: 'auto',
                marginRight: 'auto',
              },
            }}>
            <Container>
              <h1
                css={{
                  color: colors.brand,
                  textAlign: 'center',
                  margin: 0,
                  fontSize: 35,
                  letterSpacing: '0.01em',
                  [media.size('xsmall')]: {
                    fontSize: 30,
                  },
                  [media.greaterThan('xlarge')]: {
                    fontSize: 40,
                  },
                }}>
                Appbase.io Docs
              </h1>
              <Flex
                halign="center"
                css={{
                  paddingTop: 40,

                  [media.greaterThan('xlarge')]: {
                    paddingTop: 65,
                  },
                }}
              >
                <SearchBox prefixSlash />
              </Flex>
              {/*<!--p
                css={{
                  paddingTop: 15,
                  textAlign: 'center',
                  fontSize: 24,
                  letterSpacing: '0.01em',
                  fontWeight: 200,

                  [media.size('xsmall')]: {
                    fontSize: 16,
                    maxWidth: '12em',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  },

                  [media.greaterThan('xlarge')]: {
                    paddingTop: 20,
                    fontSize: 30,
                  },
                }}>
                The streaming NoSQL database
              </p-->*/}
              <Flex
                valign="center"
                css={{
                  paddingTop: 40,

                  [media.greaterThan('xlarge')]: {
                    paddingTop: 65,
                  },
                }}>
                <CtaItem>
                  <ButtonLink to="/concepts/intro.html" type="primary">
                    Docs
                  </ButtonLink>
                </CtaItem>
                <CtaItem>
                  <ButtonLink
                    to="/javascript/quickstart.html"
                    type="secondary">
                    Getting Started
                  </ButtonLink>
                </CtaItem>
              </Flex>
            </Container>
          </div>
        </header>

        <Container>
          <div
            css={[sharedStyles.markdown, markdownStyles]}
            dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}
          />
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const CtaItem = ({children, primary = false}) => (
  <div
    css={{
      width: '50%',

      [media.between('small', 'large')]: {
        paddingLeft: 20,
      },

      [media.greaterThan('xlarge')]: {
        paddingLeft: 40,
      },

      '&:first-child': {
        textAlign: 'right',
        paddingRight: 15,
      },

      '&:nth-child(2)': {
        [media.greaterThan('small')]: {
          paddingLeft: 15,
        },
      },
    }}>
    {children}
  </div>
);

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query HomeMarkdown($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;

export default Home;

// TODO This nasty CSS is required because 'docs/index.md' defines hard-coded class names.
const markdownStyles = {
  '& .home-section': {
    marginTop: 20,
    marginBottom: 15,

    [media.greaterThan('medium')]: {
      marginTop: 60,
      marginBottom: 65,
    },
  },

  '& .home-section:first-child': {
    [media.lessThan('medium')]: {
      marginTop: 0,
      marginBottom: 0,
      overflowX: 'auto',
      paddingTop: 30,
      WebkitOverflowScrolling: 'touch',
      position: 'relative',
      maskImage:
        'linear-gradient(to right, transparent, white 10px, white 90%, transparent)',
    },
  },

  '& .homeDivider': {
    height: 1,
    marginBottom: -1,
    border: 'none',
    borderBottom: `1 solid ${colors.divider}`,
  },

  '& .marketing-row': {
    display: 'flex',
    flexDirection: 'row',

    [media.lessThan('medium')]: {
      display: 'block',
      whiteSpace: 'nowrap',
    },

    '&:nth-child(n+1)': {
      [media.greaterThan('medium')]: {
        marginTop: 60,
      },
    },
  },

  '& .marketing-col': {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 1 33%',
    marginLeft: 40,

    '&:first-of-type': {
      marginLeft: 0,

      [media.lessThan('medium')]: {
        marginLeft: 10,
      },
    },

    [media.lessThan('medium')]: {
      display: 'block',
      verticalAlign: 'top',
      marginLeft: 0,
      whiteSpace: 'normal',
      width: '90%',
      marginLeft: 10,
      marginRight: 20,
      paddingBottom: 40,

      '&:first-of-type': {
        marginTop: 0,
      },
    },

    '& h3': {
      color: colors.subtle,
      paddingTop: 0,
      fontWeight: 300,
      fontSize: 20,

      [media.greaterThan('xlarge')]: {
        fontSize: 24,
        fontWeight: 200,
      },
    },

    '& p': {
      lineHeight: 1.7,
    },

    '& h3 + p': {
      marginTop: 20,
    },
  },

  '& .example': {
    marginTop: 40,

    '&:first-child': {
      marginTop: 0,
    },

    [media.greaterThan('xlarge')]: {
      marginTop: 80,
    },
  },
};
