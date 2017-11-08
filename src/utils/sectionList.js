import navBasic from '../../content/docs/components/nav.yml';
import navMap from '../../content/docs/map-components/nav.yml';
import navSearch from '../../content/docs/search-components/nav.yml';
import navAdvanced from '../../content/docs/advanced/nav.yml';
import navTutorial from '../../content/getting-started/nav.yml';

const nav = [...navTutorial, ...navBasic, ...navMap, ...navSearch, ...navAdvanced];

const sectionListDocs = nav.map(item => ({
  ...item,
  directory: 'docs',
}));

const sectionListTutorial = nav.map(item => ({
  ...item,
  directory: 'getting-started',
}));

export {sectionListDocs, sectionListTutorial};
