import React from 'react';
import { Switch } from 'antd';
import PropTypes from 'prop-types';
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import "./styles.css";
  
const ThemeSwitch = ({ onClick }) => {
  return (
    // <div>
    //   <Switch 
    //     checked={localStorage.getItem('theme') === 'dark'}
    //     onChange={e => {
    //       localStorage.setItem('theme', e ? 'dark' : 'light')
    //     }}
    //   />
    // </div>
    <div>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          // <Switch 
          //   checked={theme === 'dark'}
          //   onChange={e => {
          //     toggleTheme(e ? 'dark' : 'light')
          //   }}
          // />
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

    // <label class="switch">
    //     <input type="checkbox">
    //     <span class="slider round"></span>
    // </label>

  );
};
 
ThemeSwitch.defaultProps = {
  onClick: () => {},
};

ThemeSwitch.propTypes = {
  onClick: PropTypes.func,
};

export default ThemeSwitch;