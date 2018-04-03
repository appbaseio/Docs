import Container from 'components/Container';
import HeaderLink from './HeaderLink';
import Link from 'gatsby-link';
import React, { Component } from 'react';
import {colors, media} from 'theme';

import logoSvg from 'icons/logo.svg';
import SearchBox from 'components/SearchBox';
import SearchSvg from './SearchSvg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
    };
  }

  componentDidUpdate(nextProps) {
    if (this.props.location !== nextProps.location && this.state.showSearch) {
      this.setState({
        showSearch: false,
      });
    }
  }

  toggleSearch = () => {
    const showSearch = !this.state.showSearch;
    this.setState({
      showSearch,
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.toggleSearch();
    }
  }

  render() {
    const {location} = this.props;
    return (
      <header
        onKeyDown={this.handleKeyDown}
        css={{
          backgroundColor: colors.darker,
          color: colors.white,
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          top: 0,
          left: 0,
        }}>
        <Container>
          <div
            css={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
              [media.between('small', 'large')]: {
                height: 50,
              },
              [media.lessThan('small')]: {
                height: 40,
              },
            }}>
            <Link
              css={{
                display: 'flex',
                marginRight: 10,
                height: '100%',
                alignItems: 'center',
                color: colors.brand,

                ':focus': {
                  outline: 0,
                  color: colors.white,
                },

                [media.lessThan('small')]: {
                  flex: '0 0 auto',
                },
              }}
              to="/">
              <img
                src={logoSvg}
                alt="Appbase.io Logo"
                css={{
                  height: 40,

                  [media.lessThan('small')]: {
                    height: 30,
                  },
                }}
              />
              <span
                css={{
                  color: 'inherit',
                  marginLeft: 10,
                  fontWeight: 700,
                  fontSize: 20,
                  lineHeight: '20px',
                  [media.lessThan('large')]: {
                    fontSize: 16,
                    marginTop: 1,
                  },
                }}>
              </span>
            </Link>

            <nav
              css={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'stretch',
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                height: '100%',
                width: '60%',

                [media.size('xsmall')]: {
                  flexGrow: '1',
                  width: 'auto',
                },
                [media.greaterThan('xlarge')]: {
                  width: null,
                },
                [media.lessThan('small')]: {
                  maskImage:
                    'linear-gradient(to right, transparent, black 20px, black 90%, transparent)',
                },
                [media.lessThan('medium')]: {
                  display: 'none',
                },
              }}>
              <HeaderLink
                isActive={location.pathname.includes('/concepts/')}
                title="Concepts"
                to="/concepts/intro.html"
              />
              <HeaderLink
                isActive={location.pathname.includes('/javascript/')}
                title="Javascript"
                to="/javascript/quickstart.html"
              />
              <HeaderLink
              isActive={location.pathname.includes('/rest/')}
              title="REST API"
              to="/rest-quickstart.html"
              />
              <HeaderLink
                isActive={location.pathname.includes('/interactive/')}
                title="Interactive Examples"
                to="/interactive/javascript.html"
              />
            </nav>
            {location.pathname !== '/' && !this.state.showSearch && (
              <div onClick={this.toggleSearch} role="button" tabIndex="0" css={{ cursor: 'pointer', paddingLeft: 10 }}>
                <SearchSvg />
              </div>
            )}
            {
              this.state.showSearch &&
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  [media.lessThan('small')]: {
                    width: '100%',
                  },
                }}
              >
                <SearchBox handleBlur={this.toggleSearch} prefixSlash />
              </div>
            }
          </div>
        </Container>
      </header>
    );
  }
}

export default Header;
