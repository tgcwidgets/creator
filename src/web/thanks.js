import ProcessPayment from './components/ProcessPayment.svelte';

export const processPayment = new ProcessPayment({
	target: document.getElementById('process-payment'),
});
