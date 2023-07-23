const url = require('url');

module.exports = (req, res) => {
	const { pathname, hash } = url.parse(req.url);
	const lowercasePathname = pathname.toLowerCase();
	const redirectUrl = hash ? `${lowercasePathname}${hash}` : lowercasePathname;

	// Check if the current pathname is already in lowercase
	if (pathname === lowercasePathname) {
		// Send a 404 status if the URL is already in lowercase
		res.status(404).send('Not Found');
	} else {
		res.writeHead(301, { Location: redirectUrl });
	}

	res.end();
};
