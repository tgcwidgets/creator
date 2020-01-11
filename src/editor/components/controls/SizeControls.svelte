<script>
	import { derived, writable } from 'svelte/store';

	import ControlsSection from '../ControlsSection.svelte';
	import ControlsButton from '../ControlsButton.svelte';
	import ControlsButtonRow from '../ControlsButtonRow.svelte';
	import Slider from '../Slider.svelte';

	import { config } from '../../../widget/store';

	let size = derived(config, c => c.size);
	let height = writable({
		show: false,
		min: 0,
		max: 0,
		def: 0,
		value: 0,
	});
	let width = writable({
		show: false,
		min: 0,
		max: 0,
		def: 0,
		value: 0,
	});

	size.subscribe(s => {
		if (s === 'narrow') {
			height.set({
				show: true,
				min: 350,
				max: 650,
				def: 450,
				value: 450,
			});
			width.set({ show: false });
		} else if (s === 'large') {
			height.set({
				show: true,
				min: 260,
				max: 600,
				def: 320,
				value: 320,
			});
			width.set({
				show: true,
				min: 500,
				max: 1000,
				def: 720,
				value: 720,
			});
		} else if (s === 'wide') {
			height.set({ show: false });
			width.set({
				show: true,
				min: 500,
				max: 1000,
				def: 720,
				value: 720,
			});
		} else {
			height.set({ show: false });
			width.set({ show: false });
		}
	});

	height.subscribe(({ max, value }) => {
		$config.height = value > max ? '100%' : `${ value }px`;
	});

	width.subscribe(({ max, value }) => {
		$config.width = value > max ? '100%' : `${ value }px`;
	});

	function valueLabelFn(min, max) {
		return value => {
			if (value > max) return 'fill';
			return `${ value }px`;
		}
	}
</script>

<ControlsSection title="Size">
	<ControlsButtonRow>
		<ControlsButton key="size" value="tiny" style="width:12px; height:12px" />
		<ControlsButton key="size" value="narrow" style="width:12px; height:20px" />
		<ControlsButton key="size" value="large" style="width:20px; height:20px" />
		<ControlsButton key="size" value="wide" style="width:20px; height:10px" />
	</ControlsButtonRow>

	{#if $width.show}
		<Slider
				label="Width"
				step="5"
				min={ $width.min }
				max={ $width.max + 5 }
				valueLabelFn={ valueLabelFn($width.min, $width.max) }
				bind:value={ $width.value } />
	{/if}

	{#if $height.show}
		<Slider
				label="Height"
				step="5"
				min={ $height.min }
				max={ $height.max + 5 }
				valueLabelFn={ valueLabelFn($height.min, $height.max) }
				bind:value={ $height.value } />
	{/if}

	{#if $config.height === '100%'}
		<p class="size-controls__warning"><strong>Important:</strong> 100% height will not work on all websites, and is likely not what you want. Some knowledge of CSS may be required to get it to work properly.</p>
	{/if}
</ControlsSection>

<style>
.size-controls__warning {
	margin: 0 10px 10px;
	padding: 8px 10px;

	background: hsl(200, 40%, 92%);
	border-radius: 4px;

	font-size: 0.8rem;
	font-weight: 600;
}

.size-controls__warning strong {
	font-weight: 800;
}
</style>
