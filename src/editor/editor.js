import '../shared/global.css';

import qs from 'querystringify';
import Editor from './components/Editor.svelte';
import { config, game } from '../widget/store';
import { clearWidget } from './store';

const app = new Editor({
	target: document.body,
});

export default app;


function updateId() {
	if (window.location.search.length > 1) {
		let data = qs.parse(window.location.search.slice(1));

		if (data.id !== undefined) {
			config.update(c => {
				c.id = data.id;
				return c;
			});

			return;
		}
	}

	clearWidget();
}

window.onpopstate = () => updateId();
updateId();
