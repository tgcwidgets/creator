<script>
	import qs from 'querystringify';
	import { onMount } from 'svelte';

	let ready = false;
	let error = false;
	let message = 'Processing payment...';

	function processPayment() {
		if (window.location.search.length < 1) {
			message = 'Transaction canceled';
			ready = true;
			return;
		}

		let { claim_key } = qs.parse(window.location.search);
		if (!claim_key) {
			message = 'Invalid transaction';
			error = true;
			return;
		}

		fetch('https://www.thegamecrafter.com/api/claim-cp-purchase', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ claim_key }),
		})
			.then(res => res.json())
			.then(data => {
				if (!data.result) {
					message = 'Transaction error';
					error = true;
					return;
				}

				message = 'Thank you for your support!';
				ready = true;
			})
	}

	onMount(() => processPayment());
</script>

<h1 class="header__title">TGC Widget Creator</h1>
<p class="header__slogan">{ message }</p>

{#if error}
<p class="header__small">Please go back and try again. If this keeps happening, <a href="https://twitter.com/woubuc">let me know</a>.</p>
{/if}

{#if ready || error}
	<a class="header__button" href="/">Back</a>
{/if}
