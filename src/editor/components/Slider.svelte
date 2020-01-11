<script>
	export let label;
	export let value;
	export let max;
	export let min;
	export let valueLabelFn = val => val;

	$: valueLabel = valueLabelFn(value);
</script>

<label class="slider">
	<span class="slider__label">{ label }</span>
	<input class="slider__input" type="range" min={ min } max={ max } bind:value>
	<span class="slider__value">{ valueLabel }</span>
</label>

<style>
.slider {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	padding: 0px 20px;
}
.slider:first-child {
	padding-top: 10px;
}

.slider__label {
	width: 100%;
	margin: 4px 0 -6px 0;

	color: hsl(200, 15%, 50%);
	font-weight: 600;
	font-size: 0.8rem;
}

.slider__value {
	width: 60px;

	color: hsl(200, 15%, 60%);
	text-align: right;
	font-weight: 800;
	font-size: 0.8rem;
}

.slider__input {
	width: calc(100% - 60px);
}
</style>
