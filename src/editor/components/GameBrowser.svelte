<script>
	import qs from 'querystringify';
	import { anyNonNil as isUuid } from 'is-uuid';
	import { get, writable } from 'svelte/store';

	import { config } from '../../widget/store';
	import { recentGames } from '../store';

	const ALGOLIA_APPLICATION_ID = '5V0BUFDX8J';
	const ALGOLIA_API_KEY = 'a25692c12853aea7a77c5a7125498512';
	const ALGOLIA_INDEX = 'products';

	let searching = false;
	let query = writable('');
	let results = [];

	query.subscribe(q => search(q));
	function search(q) {
		console.log('query updated', q);

		if (searching) return;
		if (q.length === 0) {
			results = [];
			return;
		}

		searching = true;
		if (isUuid(q)) {
			fetch(`https://www.thegamecrafter.com/api/game/${ q }`)
				.then(res => res.json())
				.then(data => new Promise(resolve => {
					let img = new Image();
					img.onload = () => resolve(data);
					img.src = data.result.preview_uri || '/cover_missing.png';
				}))
				.then(data => {
					results = [data.result];
					searching = false;

					let newQuery = get(query);
					if (newQuery !== q) {
						search(newQuery)
					}
				});
			return;
		}

		fetch(`https://${ ALGOLIA_APPLICATION_ID }-dsn.algolia.net/1/indexes/${ ALGOLIA_INDEX }/query`, {
			method: 'POST',
			headers: {
				'X-Algolia-API-Key': ALGOLIA_API_KEY,
				'X-Algolia-Application-Id': ALGOLIA_APPLICATION_ID,
			},
			body: JSON.stringify({
				params: qs.stringify({
					query: q,
					hitsPerPage: 15,
					facetFilters: ['department:board-games'],
				}, ''),
			}),
		})
			.then(res => res.json())
			.then(({ hits }) => {
				results = hits;
				searching = false;

				let newQuery = get(query);
				if (newQuery !== q) {
					search(newQuery)
				}
			});
	}

	function loadGame(game) {
		history.pushState({ id: game.id }, 'TGC Widgets', `/editor?id=${ encodeURIComponent(game.id) }`);
		recentGames.update(games => {
			let index = games.findIndex(g => g.id === game.id);
			if (index > -1) {
				games.splice(index, 1);
			}
			games.unshift(game);

			return games.slice(0, 5);
		});
		config.update(c => {
			c.id = game.id;
			return c;
		});
	}
</script>

<div class="game-browser">

	{#if $recentGames.length > 0}
		<h2 class="game-browser__title">Recent games</h2>
		<div class="game-browser__results">
			{#each $recentGames as game}
				<a
						class="game-browser__result"
						href="/editor?id={ game.id }" on:click|preventDefault={ loadGame.bind(null, game) }
						style="background-image:url({ game.preview_uri || '/cover_missing.png' })">
					<span class="game-browser__game-name">{ game.name }</span>
				</a>
			{/each}
		</div>
	{/if}

	<h2 class="game-browser__title">Search</h2>
	<input class="game-browser__input" type="text" bind:value={ $query }>

	{#if $query.length === 0}
		<div class="game-browser__empty">
			<p>Search for a game on the TGC store, or paste the UUID of your game</p>
		</div>

	{:else if results.length === 0}
		<div class="game-browser__empty">
			{#if searching}
				<p>Searching for <em>{ $query }</em></p>
			{:else}
				<p>No results found for <em>{ $query }</em></p>
			{/if}
		</div>

	{:else}
		<div class="game-browser__results">
			{#each results as game}
				<a
					class="game-browser__result"
					href="/editor?id={ game.id }" on:click|preventDefault={ loadGame.bind(null, game) }
					style="background-image:url({ game.preview_uri || '/cover_missing.png' })">
					<span class="game-browser__game-name">{ game.name }</span>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
.game-browser {
	position: absolute;
	z-index: 2;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);

	display: flex;
	flex-direction: column;

	width: calc(100vw - 40px);
	height: calc(100vh - 40px);
	max-width: 980px;
	overflow: hidden;
	padding: 5px 20px;

	background: white;
	border-radius: 8px;
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);

	transition: all 240ms ease-out;
}

.game-browser__title {
	font-size: 1rem;
	font-weight: 800;
	padding-top: 10px;
	margin-bottom: -5px;
	color: hsl(200, 10%, 40%);
}

.game-browser__input {
	display: block;
	width: calc(100% - 20px);
	margin-top: 10px;
	padding: 6px 10px;

	border-radius: 6px;
	border: 1px solid hsl(200, 10%, 75%);
}

.game-browser__empty {
	padding: 50px 10px;
	text-align: center;

	color: hsl(200, 10%, 50%);
}

.game-browser__results {
	display: flex;
	flex-wrap: wrap;
	padding: 5px 0;
	margin: 0 -5px;
}

.game-browser__result {
	display: flex;
	flex-direction: column-reverse;

	width: 180px;
	height: 125px;
	margin: 5px;

	border-radius: 8px;
	border: 3px solid white;
	background: transparent no-repeat center;
	background-size: cover;

	overflow: hidden;
	text-decoration: none;
	filter: grayscale(0.2);
}
.game-browser__result:hover {
	border-color: hsl(200, 100%, 50%);
	filter: grayscale(0);
}

.game-browser__game-name {
	display: block;
	padding: 20px 6px 4px 6px;

	color: white;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));

	white-space: pre;
	overflow: hidden;
	text-overflow: ellipsis;

	font-weight: 600;
	text-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.4);
}
</style>
