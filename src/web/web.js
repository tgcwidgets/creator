import './web.less';

import DonateCP from './components/DonateCP.svelte';
import WidgetPreview from './components/WidgetPreview.svelte';

let widgetContainer = document.getElementById('widget-container');
let first = true;

function createWidget() {
	let widget = new WidgetPreview({
		target: widgetContainer,
	});

	widget.$on('load', () => {
		console.log('widget loaded');
		widgetContainer.classList.add('widget-container--visible');
		widgetContainer.classList.remove('widget-container--new');
	});

	setTimeout(() => {
		widgetContainer.classList.add('widget-container--old');
		widgetContainer.classList.remove('widget-container--visible');
		setTimeout(() => {
			widget.$destroy();
			createWidget();
			widgetContainer.classList.remove('widget-container--old');
			widgetContainer.classList.add('widget-container--new');
		}, 200);
	}, first ? 2000 : 4000);
	first = false;

	return widget;
}

createWidget();


export const donateCp = new DonateCP({
	target: document.getElementById('donate-crafter-points'),
});
