import navConcepts from
'../../content/docs/concepts/nav.yml';
import navJavascript from
'../../content/docs/javascript/nav.yml';
import navREST from
'../../content/docs/rest/nav.yml';
import navGolang from
'../../content/docs/golang/nav.yml';
import navInteractive from
'../../content/docs/interactive/nav.yml';

const nav = [...navConcepts, ...navJavascript, ...navREST, ...navGolang, ...navInteractive];

const sectionListDocs = nav.map(item => ({
  ...item,
  directory: 'docs',
}));

export {sectionListDocs, nav};
