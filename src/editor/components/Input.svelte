<script>
	export let label;
	export let value;
	export let disabled = false;
</script>

<label class="input" class:input--disabled={ disabled }>
	<span class="input__label">{ label }</span>
	<input class="input__input" type="text" { value } { disabled } on:input>
</label>


<style>
.input {
	display: block;
	padding: 10px 20px;
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
