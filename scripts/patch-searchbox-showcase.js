/**
 * searchbox-showcase fd402658 updated src/showcaseData.js but never rebuilt lib/.
 * Docs imports lib/index.js (package main). Patch stale CSB branch refs after install.
 */
const fs = require('fs');
const path = require('path');

const target = path.join(
	__dirname,
	'..',
	'node_modules',
	'searchbox-showcase',
	'lib',
	'index.js',
);

if (!fs.existsSync(target)) {
	process.exit(0);
}

const replacements = [
	['feat/react-showcase-examples', 'tree/next'],
	['feat%2Freact-showcase-examples', 'tree%2Fnext'],
	['feat/just-for-csb-001', 'tree/next'],
	['feat%2Fjust-for-csb-001', 'tree%2Fnext'],
];

let contents = fs.readFileSync(target, 'utf8');
const original = contents;

for (const [from, to] of replacements) {
	contents = contents.split(from).join(to);
}

if (contents !== original) {
	fs.writeFileSync(target, contents);
	console.log('patched searchbox-showcase/lib/index.js CSB branch URLs');
}
