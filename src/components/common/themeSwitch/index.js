import React from 'react';
import { Switch } from 'antd';
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import "./styles.css";
  
const ThemeSwitch = () => {
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
                  toggleTheme(e.target.checked ? 'dark' : 'light')
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
  
export default ThemeSwitch;