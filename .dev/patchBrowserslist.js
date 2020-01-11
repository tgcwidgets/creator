const fs = require('fs-extra');
const { join } = require('path');

async function patch(moduleName, browserslist) {
	let modulePath = join(__dirname, '..', 'node_modules', moduleName);

	let stats = await fs.stat(modulePath);
	if(!stats.isDirectory()) return;

	try {
		let pkgPath = join(modulePath, 'package.json');
		let pkgJson = await fs.readFile(pkgPath);
		let pkg = JSON.parse(pkgJson.toString());
		delete pkg['browserlist'];
		await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

		let blPath = join(modulePath, '.browserslistrc');
		await fs.writeFile(blPath, browserslist);

		console.log('Patched browserslist for %s', moduleName);
	} catch(_) { }
}

patch('svelte', 'last 1 chrome versions');
