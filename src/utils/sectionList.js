import navConcepts from
'../../content/docs/concepts/nav.yml';
import navJavascript from
'../../content/docs/javascript/nav.yml';
import navREST from
'../../content/docs/rest/nav.yml';

const nav = [...navConcepts, ...navJavascript];

console.log("nav", nav);
const sectionListDocs = nav.map(item => ({
  ...item,
  directory: 'docs',
}));

export {sectionListDocs};
