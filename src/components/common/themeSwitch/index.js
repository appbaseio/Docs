import React from 'react';
import PropTypes from 'prop-types';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import './styles.css';

const ThemeSwitch = ({ onClick, setThemeType }) => {
	return (
		<div>
			<ThemeToggler>
				{({ theme, toggleTheme }) => {
					if(typeof window !== 'undefined' && !localStorage.getItem('theme'))
					localStorage.setItem('theme', theme);
	
					return (
						<label className="switch">
							<input
								type="checkbox"
								onChange={e => {
									toggleTheme(e.target.checked ? 'dark' : 'light');
									onClick(e.target.checked ? 'dark' : 'light');
									setThemeType(e.target.checked ? 'dark' : 'light');
								}}
								checked={theme === 'dark'}
							/>{' '}
							<span className="slider round">
								{theme !== 'dark' ? (
									<div className="light-theme-icon icon-transition">
										<svg
											width="12px"
											height="12px"
											viewBox="0 0 100 100"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M50 4.167C52.301 4.167 54.167 6.032 54.167 8.333V16.667C54.167 18.968 52.301 20.833 50 20.833C47.699 20.833 45.833 18.968 45.833 16.667V8.333C45.833 6.032 47.699 4.167 50 4.167ZM25 50C25 36.193 36.193 25 50 25C63.807 25 75 36.193 75 50C75 63.807 63.807 75 50 75C36.193 75 25 63.807 25 50ZM50 33.333C40.795 33.333 33.333 40.795 33.333 50C33.333 59.205 40.795 66.667 50 66.667C59.205 66.667 66.667 59.205 66.667 50C66.667 40.795 59.205 33.333 50 33.333ZM54.167 83.333C54.167 81.032 52.301 79.167 50 79.167C47.699 79.167 45.833 81.032 45.833 83.333V91.667C45.833 93.968 47.699 95.833 50 95.833C52.301 95.833 54.167 93.968 54.167 91.667V83.333ZM95.833 50C95.833 52.301 93.968 54.167 91.667 54.167H83.333C81.032 54.167 79.167 52.301 79.167 50C79.167 47.699 81.032 45.833 83.333 45.833H91.667C93.968 45.833 95.833 47.699 95.833 50ZM16.667 54.167C18.968 54.167 20.833 52.301 20.833 50C20.833 47.699 18.968 45.833 16.667 45.833H8.333C6.032 45.833 4.167 47.699 4.167 50C4.167 52.301 6.032 54.167 8.333 54.167H16.667ZM82.409 17.591C84.036 19.218 84.036 21.857 82.409 23.484L76.517 29.376C74.89 31.004 72.251 31.004 70.624 29.376C68.997 27.749 68.997 25.111 70.624 23.484L76.517 17.591C78.144 15.964 80.782 15.964 82.409 17.591ZM29.376 76.516C31.003 74.889 31.003 72.251 29.376 70.624C27.749 68.996 25.111 68.996 23.484 70.624L17.591 76.516C15.964 78.143 15.964 80.782 17.591 82.409C19.218 84.036 21.856 84.036 23.484 82.409L29.376 76.516ZM17.591 17.591C19.218 15.964 21.857 15.964 23.484 17.591L29.376 23.483C31.004 25.111 31.004 27.749 29.376 29.376C27.749 31.003 25.111 31.003 23.484 29.376L17.591 23.483C15.964 21.856 15.964 19.218 17.591 17.591ZM76.517 70.624C74.89 68.997 72.251 68.997 70.624 70.624C68.997 72.252 68.997 74.89 70.624 76.517L76.517 82.41C78.144 84.037 80.782 84.037 82.409 82.41C84.036 80.782 84.036 78.144 82.409 76.517L76.517 70.624Z"
												fill="black"
											/>
										</svg>
									</div>
								) : (
									<div className="dark-theme-icon icon-transition">
										<svg
											width="12px"
											height="12px"
											viewBox="0 0 100 100"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g>
												<path fill="none" d="M0 0h100v100H0z" />
												<path
													fillRule="nonzero"
													d="M41.666 29.166a29.166 29.166 0 0 0 50 20.416v0.416c0 23.012 -18.654 41.666 -41.666 41.666S8.334 73.012 8.334 50 26.988 8.334 50 8.334h0.416A29.08 29.08 0 0 0 41.666 29.166zm-25 20.834a33.334 33.334 0 0 0 62.758 15.676A37.5 37.5 0 0 1 34.326 20.574 33.33 33.33 0 0 0 16.666 50z"
												/>
											</g>
										</svg>
									</div>
								)}
							</span>
						</label>
					)
				}}
			</ThemeToggler>
		</div>
	);
};

ThemeSwitch.defaultProps = {
	onClick: () => {},
	setThemeType: () => {},
};

ThemeSwitch.propTypes = {
	onClick: PropTypes.func,
	setThemeType: PropTypes.func,
};

export default ThemeSwitch;
