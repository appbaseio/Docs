import {urlRoot} from 'site-constants';

export default slug =>
  slug == null ? null : `${urlRoot}/${slug.replace(/^\//, '')}`;
