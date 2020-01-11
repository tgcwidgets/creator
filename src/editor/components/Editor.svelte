<script>
	import '../editor.less';

	import { hasGame } from '../store';

	import Widget from '../../widget/components/Widget.svelte';
	import Controls from './Controls.svelte';
	import GameBrowser from './GameBrowser.svelte';
</script>

<div class="editor">

	{#if $hasGame}
		<Controls />
		<div class="editor__preview">
			<Widget />
		</div>
	{:else}
		<GameBrowser />
	{/if}
</div>

<style>
.editor {
	height: 100vh;
	width: 100vw;

	background: hsl(200, 30%, 96%);
	color: hsl(200, 15%, 30%);
}

.editor__preview {
	position: absolute;
	top: 20px;
	right: 20px;

	width: calc(100vw - 280px - 60px);
	height: calc(100vh - 40px);

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
