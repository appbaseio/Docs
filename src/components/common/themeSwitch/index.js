import React from 'react';
import PropTypes from 'prop-types';
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import "./styles.css";
  
const ThemeSwitch = ({ onClick }) => {
  return (
    <div>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label class="switch">
              <input
              type="checkbox"
              onChange={e => {
                  toggleTheme(e.target.checked ? 'dark' : 'light');
                  onClick(e.target.checked ? 'dark' : 'light');
              }}
              checked={theme === 'dark'}
              />{' '}
              <span class="slider round"></span> 
          </label>
        )}
      </ThemeToggler> 
    </div>
  );
};
 
ThemeSwitch.defaultProps = {
  onClick: () => {},
};

ThemeSwitch.propTypes = {
  onClick: PropTypes.func,
};

export default ThemeSwitch;