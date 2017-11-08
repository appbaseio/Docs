import slugify from 'slugify';

export default (string, directory) => {
  const filename = slugify(string) + '.html';

  return directory ? `/${directory}/${filename}` : filename;
};
