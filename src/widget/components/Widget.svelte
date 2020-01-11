<script>
	import '../styles/widget.less';
	import CoverMissing from '../cover_missing.png';

	import { derived } from 'svelte/store';

	import { game, config, error } from '../store';
	import WidgetTop from './WidgetTop.svelte';

	let hasError = derived(error, e => e !== null);

	let classes = derived(config, c => {
		if (c === null) return '';

		return `widget--theme-${ c.themePreview || c.theme } widget--size-${ c.sizePreview || c.size }`;
	});

	let style = derived(config, ({ height, width, size, text_size, sizePreview }) => {
		let styles = [];

		styles.push(`font-size:${ text_size }px`);

		if (sizePreview === undefined) {
			if (height !== undefined && (size === 'narrow' || size === 'large')) {
				styles.push(`height:${ height }`);
			}
			if (width !== undefined && (size === 'large' || size === 'wide')) {
				styles.push(`width:${ width }`);
			}
		}

		return styles.join(';');
	});
</script>

<div
	class="widget { $classes }"
	class:widget--loading={ $game === null }
	class:widget--error={ $hasError }
	style={ $style }>

	{#if $hasError }
		<p class="widget__error">Error in widget: { $error }</p>

	{:else if $game === null }
		<div class="widget__loader"></div>

	{:else}
		<div class="widget__top">
			<img class="widget__image" src={ $game.preview_uri || CoverMissing } alt="Cover image">

			<WidgetTop />

		</div>

		<p class="widget__description" class:widget__description--fade={ $config.fade === 1 }>{ $game.description }</p>

		<span class="widget__spacer"></span>

		{#if $config.button !== 'store' && $config.link === 1}
			<a class="widget__link" href="https://www.thegamecrafter.com{ $game.shop_uri }" target="_blank">
				{ $config.link_text.length > 0 ? $config.link_text : 'View store page' }
			</a>
		{/if}
	{/if}
</div>
