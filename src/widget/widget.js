import '../shared/global.css';

import qs from 'querystringify';
import { config } from './store';
import Widget from './components/Widget.svelte';

config.update(c => {
	let data = qs.parse(window.location.search);
	return Object.assign(c, data);
});

const app = new Widget({
	target: document.body,
});

export default app;

