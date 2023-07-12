module.exports = (req, res) => {
  const lowercaseUrl = req.url.toLowerCase();
  res.writeHead(308, { Location: lowercaseUrl });
  res.end();
};
