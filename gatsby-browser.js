const onRouteUpdate = require(`./gatsby/onRouteUpdate`);
const onPreRouteUpdate = require(`./gatsby/onPreRouteUpdate`);

exports.onInitialClientRender = () => {
	const currentLocation = window.location.href;
	const lowercaseLocation = currentLocation.toLowerCase();

	if (currentLocation !== lowercaseLocation) {
		window.location.href = lowercaseLocation;
	}
};

exports.onRouteUpdate = () => onRouteUpdate.trustAllScripts();

exports.onPreRouteUpdate = () => onPreRouteUpdate.killServiceWorker();
