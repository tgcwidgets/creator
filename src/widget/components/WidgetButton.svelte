<script>
	import { derived } from 'svelte/store';
	import { game, config } from '../store';

    let action = derived([game, config], ([g, c]) => {
    	if (g === null) return '';

    	if (c.button === 'store') {
    		return `https://www.thegamecrafter.com${ g.shop_uri }`;
		}
    	return `https://www.thegamecrafter.com/cart/sku/${ g.sku_id }`;
	});

    let method = derived(config, c => {
    	if (c.button === 'store') {
    		return 'get';
		}
    	return 'post';
	});

    let label = derived(config, c => {
    	if (c.button_text.length > 0) {
    		return c.button_text;
		}
    	if (c.button === 'store') {
    		return 'View in store';
		}
    	return 'Buy now';
	});

    console.log($action, $method, $label);
</script>

<form method={ $method } action={ $action } target="_blank">
	<input class="widget-button" type="submit" value={ $label }>
</form>
