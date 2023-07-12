module.exports = (req, res) => {
	const lowercaseUrl = req.url.toLowerCase();
	res.writeHead(301, { Location: lowercaseUrl });
	res.end();
};
