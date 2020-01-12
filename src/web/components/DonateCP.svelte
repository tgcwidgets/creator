<script>
	import '../../editor/editor.less';

	import Slider from '../../editor/components/Slider.svelte';

	let isOpen = false;
	let amount = 50000;

	function close() {
		isOpen = false;
	}

	function open() {
		isOpen = true;
	}

	let redirectUri = `${ window.location.protocol }//${ window.location.host }/thanks`;

</script>

<a class="button-row__button" href="#" on:click|preventDefault={ open }>
	<span>donate crafter points</span>
	<span><strong>the game crafter</strong></span>
</a>

<div class="donate-cp" class:donate-cp--open={ isOpen }>
	<form class="donate-cp__inner" method="post" action="https://www.thegamecrafter.com/account/spendcp">
		<h2 class="donate-cp__title">Donate</h2>


		<label>
			<span>How many crafter points do you want to donate?</span>

			<Slider min="10000" max="250000" step="10000" bind:value={ amount } valueLabelFn={ v => '$' + (v / 10000).toFixed(2) } />
		</label>

		<input type="hidden" name="amount" value={ amount }>
		<input type="hidden" name="reason" value="donation to Wouter (aka Ikke)">
		<input type="hidden" name="transaction_id" value="thanks!">
		<input type="hidden" name="api_key_id" value="8596C87C-EAF9-11E5-B856-E780FCC30529">
		<input type="hidden" name="redirect_uri" value={ redirectUri }>

		<input class="donate-cp__button" type="submit" value={ `Donate ${ amount } crafter points` }>
		<input class="donate-cp__button donate-cp__button--alt" type="button" on:click|preventDefault={ close } value="Cancel">
	</form>
</div>


<style>
.donate-cp {

	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 4vh;

	background: linear-gradient(20deg, hsl(230, 55%, 55%), hsl(210, 55%, 55%));
	color: white;

	text-align: center;

	opacity: 0;
	pointer-events: none;
	transform: translateY(-20px);
	transition: all 180ms ease-out;
}
.donate-cp--open {
	opacity: 1;
	pointer-events: all;
	transform: translateY(0px);
}

.donate-cp__inner {
	padding: 20px 30px;

	background: white;
	border-radius: 6px;
	color: hsl(230, 25%, 35%);
}

.donate-cp__title {
	padding-bottom: 10px;
	font-size: 1.1rem;
	font-weight: 800;
}

.donate-cp__button {
	display: inline-block;
	padding: 6px 10px;
	border-radius: 4px;

	border: none;
	background: hsl(210, 55%, 55%);
	color: white;
	font-weight: 800;

	cursor: pointer;
}
.donate-cp__button--alt {
	background: hsl(210, 10%, 60%);
}
</style>
