module.exports = (req, res) => {
	const originalUrl = req.url;
	const lowercaseUrl = originalUrl.toLowerCase();

	if (originalUrl === lowercaseUrl) {
		// If the original URL is already lowercase, redirect to the 404 page
		res.writeHead(302, { Location: '/404' });
	} else {
		// Otherwise, redirect to the lowercase version of the URL
		res.writeHead(301, { Location: lowercaseUrl });
	}
	res.end();
};
