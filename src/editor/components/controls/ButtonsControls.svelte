<script>
	import ControlsSection from '../ControlsSection.svelte';
	import Toggle from '../Toggle.svelte';

	import { config } from '../../../widget/store';
	import Input from '../Input.svelte';

	function onButtonToggled(evt) {
		let checked = evt.target.checked;

		config.update(c => {
			c.button = checked ? 'store' : 'cart';
			return c;
		});
	}

	function onStoreLinkToggled(evt) {
		let checked = evt.target.checked;

		config.update(c => {
			c.link = checked ? 0 : 1;
			return c;
		});
	}

	function onButtonTextChanged(evt) {
		let text = evt.target.value;

		config.update(c => {
			c.button_text = text;
			return c;
		});
	}

	function onLinkTextChanged(evt) {
		let text = evt.target.value;

		config.update(c => {
			c.link_text = text;
			return c;
		});
	}
</script>

<ControlsSection title="Buttons">

	<Toggle label="Button links to store page" checked={ $config.button === 'store' } on:change={ onButtonToggled } />

	<Toggle label="Hide store link" checked={ $config.link === 0 } disabled={ $config.button === 'store' } on:change={ onStoreLinkToggled } />

	<Input label="Custom button text" value={ $config.button_text } on:input={ onButtonTextChanged } />
	<Input label="Custom link text" value={ $config.link_text } disabled={ $config.link === 0 || $config.button === 'store' } on:input={ onLinkTextChanged } />

</ControlsSection>
