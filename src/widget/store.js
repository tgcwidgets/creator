import { writable } from 'svelte/store';

export const defaultConfig = () => ({
	id: undefined,
	theme: 'light',
	colour: 'blue',
	size: 'narrow',
	button: 'cart',
	button_text: '',
	fade: 1,
	link: 1,
	link_text: '',
	title: 1,
	text_size: 15,
});

export let game = writable(null);
export let error = writable(null);
export let config = writable(defaultConfig());

let lastId = undefined;
config.subscribe(({ id }) => {
	if (id === undefined) {
		lastId = undefined;
		game.set(null);
		return;
	}

	if (id === lastId) return;
	lastId = id;

	fetch(`https://www.thegamecrafter.com/api/game/${ id }`)
		// Parse JSON
		.then(res => res.json())

		// Preload image
		.then(data => new Promise(resolve => {
			let img = new Image();
			img.onload = () => resolve(data);
			img.src = data.result.preview_uri || '/cover_missing.png';
		}))

		// Update store
		.then(data => {
			game.set(data.result);
		})

		// Handle errors
		.catch(err => {
			console.error(err);
			error.set(err.message);
		});
});
