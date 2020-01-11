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
		<ul class="editor__footer">
			<li>made by <a href="https://twitter.com/woubuc" target="_blank">@woubuc</a></li>
			<li>not affiliated with thegamecrafter.com</li>
			<li><a href="https://github.com/tgcwidgets/creator" target="_blank">source</a></li>
			<li><a class="editor__footer-button" href="/#donate">donate</a></li>
		</ul>
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

.editor__footer {
	position: absolute;
	bottom: 10px;
	right: 12px;

	display: flex;
	align-items: center;
	list-style: none;

	font-size: 0.7rem;
	color: hsl(200, 25%, 60%);
}
.editor__footer li::after {
	display: inline-block;
	content: '';
	width: 4px;
	height: 4px;
	margin: 0 6px 1px;
	border-radius: 50%;
	background: hsl(200, 25%, 85%);
}
.editor__footer li:last-child::after {
	display: none;
}
.editor__footer a {
	color: hsl(200, 25%, 50%);
}
.editor__footer a:hover {
	color: hsl(200, 25%, 30%);
}

a.editor__footer-button {
	display: inline-block;
	padding: 3px 5px;

	color: white;
	background: hsl(200, 60%, 50%);
	border-radius: 3px;

	text-decoration: none;
	cursor: pointer;
}
a.editor__footer-button:hover {
	background: hsl(200, 60%, 65%);
	color: white;
}
</style>
