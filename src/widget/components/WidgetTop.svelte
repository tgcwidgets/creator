<script>
	import { game, config, error } from '../store';

	import WidgetRating from './WidgetRating.svelte';
	import WidgetButton from './WidgetButton.svelte';

</script>

<div class="widget-top">
	{#if $config.title === 1 }
		<h1 class="widget-top__title">{ $game.name }</h1>
	{/if}

	<WidgetButton />

	<p class="widget-top__info">
		<WidgetRating />
		<span class="widget-top__price">${ $game.price }</span>
	</p>
</div>
