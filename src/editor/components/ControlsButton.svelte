<script>
	import { derived } from 'svelte/store';
	import { config } from '../../widget/store';

	export let key;
	export let value;
	export let style;

	let data = derived(config, c => c[key]);
	let isActive = derived(data, d => d === value);

	function preview() {
		config.update(c => {
			c[key + 'Preview'] = value;
			return c;
		});
	}
	function clearPreview() {
		config.update(c => {
			c[key + 'Preview'] = undefined;
			return c;
		});
	}

	function onClick() {
		config.update(c => {
			c[key + 'Preview'] = undefined;
			c[key] = value;
			return c;
		});
	}
</script>

<button
	class="controls-button"
	class:controls-button--active={ $isActive }
	on:click|preventDefault={ onClick }
	on:mouseenter={ preview }
	on:mouseleave={ clearPreview }>
	<span class="controls-button__preview" style={ style }></span>
</button>

<style>
.controls-button {
	display: flex;
	align-items: center;
	justify-content: center;

	flex: 50px 1 0;
	height: 50px;
	padding: 10px;

	background: white;
	border-radius: 6px;
	border: none;

	cursor: pointer;
	transition: all 80ms ease-out;
}
.controls-button:hover {
	background: hsl(200, 20%, 96%);
}

.controls-button__preview {
	display: block;
	width: 32px;
	height: 32px;

	background: hsl(200, 20%, 84%);
	border-color: hsl(200, 20%, 84%);
	border-style: solid;
	border-radius: 2px;
}

.controls-button--active .controls-button__preview {
	background: hsl(200, 60%, 50%);
	border-color: hsl(200, 60%, 50%);
}
</style>
