<script>
	export let label = '';
	export let name = '';
	export let value;
	export let disabled = false;
	export let numeric = false;
</script>

<label class="input" class:input--disabled={ disabled }>
	{#if label.length > 0 }
		<span class="input__label">{ label }</span>
	{/if}

	<input class="input__input" name={ name } type={ numeric ? 'number' : 'text' } { value } { disabled } on:input>
</label>


<style>
.input {
	display: block;
	padding: 10px 20px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

input[type=number] {
	-moz-appearance:textfield;
}

.input__label {
	display: block;

	color: hsl(200, 15%, 50%);
	font-weight: 600;
	font-size: 0.8rem;
}

.input__input {
	display: block;
	width: 100%;
	padding: 6px 10px;
	background: hsl(200, 20%, 90%);
	border: none;
	border-radius: 4px;
}


.input--disabled .input__label {
	color: hsl(200, 15%, 70%);
}
.input--disabled .input__input {
	color: hsl(200, 15%, 65%);
	background: hsl(200, 20%, 94%);
}
</style>
