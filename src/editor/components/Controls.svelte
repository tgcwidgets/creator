<script>
	import { derived } from 'svelte/store';

	import GameBrowser from './GameBrowser.svelte';
	import SizeControls from './controls/SizeControls.svelte';
	import AppearanceControls from './controls/AppearanceControls.svelte';

	import { config } from '../../widget/store';
	import { hasGame, clearWidget } from '../store';
	import ButtonsControls from './controls/ButtonsControls.svelte';

	let size = derived(config, c => c.size);
	let theme = derived(config, c => c.theme);

	function back() {
		clearWidget();
		window.history.pushState({}, 'TGC Widgets', '/editor');
	}
</script>

<div class="controls">
	<div class="controls__options">
		<SizeControls />
		<AppearanceControls />
		<ButtonsControls />
	</div>
	<div class="controls__actions">
		<a class="controls__action controls__action--back" on:click|preventDefault={ back } >Back</a>
		<a class="controls__action controls__action--primary">Get embed code</a>
	</div>
</div>

<style>
.controls {
	position: absolute;
	z-index: 2;
	top: 20px;
	left: 20px;

	display: flex;
	flex-direction: column;

	width: 280px;
	max-width: 280px;
	height: calc(100vh - 40px);
	overflow: hidden;

	background: white;
	border-radius: 8px;
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);

	transition: all 240ms ease-out;
}
.controls--large {
	width: calc(100vw - 40px);
	max-width: 960px;
}

.controls__options {
	flex-grow: 1;
	border-bottom: 1px solid hsl(200, 20%, 90%);
	overflow-y: auto;
	overflow-x: hidden;
}

.controls__actions {
	display: flex;
}
.controls__action {
	display: block;
	padding: 20px;

	color: hsl(200, 20%, 40%);
	font-weight: 800;

	cursor: pointer;
	transition: all 80ms ease-out;
}
.controls__action:hover {
	background: hsl(200, 20%, 96%);
}

.controls__action--primary {
	flex-grow: 1;
	text-align: center;

	color: white;
	background: hsl(200, 60%, 50%);
}
.controls__action--primary:hover {
	background: hsl(200, 60%, 60%);
}

.controls__action--back::before {
	display: inline-block;
	content: '';

	width: 6px;
	height: 6px;
	margin-right: 4px;
	margin-bottom: 1px;

	border-top-left-radius: 3px;
	border: 2px solid hsl(200, 20%, 40%);
	border-bottom: none;
	border-right: none;

	transform: rotateZ(-45deg);
}
</style>
