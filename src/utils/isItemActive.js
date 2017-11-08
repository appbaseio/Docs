import slugify from 'utils/slugify';

const toAnchor = (href = '') => {
  const index = href.indexOf('#');
  return index >= 0 ? href.substr(index) : '';
};

const isItemActive = (location, item) => {
  if (location.hash) {
    if (
      item.subitems &&
      item.subitems.length &&
      item.href === location.pathname
    ) {
      return item.subitems.some(
        subitem => location.hash === toAnchor(subitem.href),
      );
    } else if (item.href) {
      return location.hash === toAnchor(item.href);
    }
  } else if (item.id.includes('html')) {
    return location.pathname.includes(item.id);
  }
  const slugId = location.pathname.split('/').slice(-1)[0];
  return slugId === slugify(item.id);
};

export default isItemActive;
