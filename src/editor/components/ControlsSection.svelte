<script>
	export let title;
	export let height = 'auto';

	let collapsed = false;

	function toggle() {
		collapsed = !collapsed;
		console.log('toggle', collapsed);
	}
</script>

<div class="controls-section" class:controls-section--collapsed={ collapsed }>
	<h2 class="controls-section__title" on:click={ toggle }>
		<span>{ title }</span>
	</h2>

	<div class="controls-section__contents" style="height: { height }">
		<slot />
	</div>
</div>

<style>
.controls-section__title {
	display: flex;
	align-items: center;

	padding: 15px 20px;

	color: hsl(200, 10%, 40%);
	border-bottom: 1px solid hsl(200, 20%, 90%);

	font-size: 1rem;
	font-weight: 800;

	cursor: pointer;

	-webkit-user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-ms-user-select: none;
}
.controls-section__title > span {
	flex-grow: 1;
}
.controls-section__title::after {
	display: block;
	content: '';
	width: 0;
	height: 0;
	border: 6px solid transparent;
	border-bottom-color: hsl(200, 10%, 80%);
	border-top: none;
}

.controls-section__contents {
	width: calc(100% + 10px);
	margin-left: -5px;
	padding: 10px 5px;
	box-shadow: inset 0 0 6px -1px rgba(0, 0, 0, 0.1);
	overflow: hidden;
}

.controls-section--collapsed .controls-section__title {
	color: hsl(200, 10%, 55%)
}
.controls-section--collapsed .controls-section__title::after {
	transform: rotateZ(180deg);
}
.controls-section--collapsed .controls-section__contents {
	padding-top: 0;
	padding-bottom: 0;
	height: 0 !important;
}
</style>
