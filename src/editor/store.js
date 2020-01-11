import { derived, get, writable } from 'svelte/store';
import { config, game, defaultConfig } from '../widget/store';

export let hasGame = derived(config, c => c.id !== undefined);

function loadRecentGames() {
	let data = localStorage.getItem('tgcwidgets:recentgames');
	if (data === undefined) return [];
	data = JSON.parse(data);
	if (!Array.isArray(data)) return [];
	return data;
}

export let recentGames = writable(loadRecentGames());

recentGames.subscribe(games => {
	localStorage.setItem('tgcwidgets:recentgames', JSON.stringify(games));
});


let previewValues = {};

export function preview(key, value) {
	previewValues[key] = get(config)[key];
	config.update(c => {
		c[key] = value;
		return c;
	});
}

export function clearPreview(key) {
	if (previewValues[key] === undefined) return;

	config.update(c => {
		c[key] = previewValues[key];
		return c;
	});
	delete previewValues[key];
}


export function clearWidget() {
	config.set(defaultConfig());
}
