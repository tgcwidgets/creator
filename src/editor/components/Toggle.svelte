<script>
	export let checked;
	export let label;
	export let disabled = false;
</script>

<label class="toggle" class:toggle--active={ checked === true } class:toggle--disabled={ disabled }>
	<span class="toggle__label">{ label }</span>
	<input class="toggle__input" type="checkbox" { disabled } bind:checked on:change>
	<span class="toggle__display">
		<span class="toggle__knob"></span>
	</span>
</label>

<style>
.toggle {
	display: flex;
	align-items: center;
	flex-direction: row-reverse;

	padding: 10px 20px;

	cursor: pointer;

	-webkit-user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-ms-user-select: none;
}

.toggle__label {
	flex-grow: 1;

	color: hsl(200, 15%, 50%);
	font-weight: 600;
	font-size: 0.8rem;
}

.toggle__input {
	width: 20px;
	margin-left: -20px;

	opacity: 0;
}

.toggle__display {
	display: block;
	width: 22px;
	height: 14px;
	margin-right: 6px;

	border-radius: 7px;
	background: hsl(200, 25%, 86%);
}
.toggle__knob {
	display: block;
	height: 10px;
	width: 10px;
	margin: 2px;

	border-radius: 50%;
	background: hsl(200, 15%, 60%);

	transition: transform 80ms ease-out;
}


.toggle--active .toggle__display {
	background: hsl(200, 80%, 50%);
}
.toggle--active .toggle__knob {
	background: white;
	transform: translateX(8px);
}


.toggle--disabled {
	cursor: default;
}
.toggle--disabled .toggle__label {
	color: hsl(200, 15%, 70%);
}
.toggle--disabled .toggle__display {
	background: hsl(200, 15%, 94%);
}
.toggle--disabled .toggle__knob {
	background: hsl(200, 15%, 84%);
}
</style>
