<script>
	import ControlsSection from '../ControlsSection.svelte';
	import ControlsButton from '../ControlsButton.svelte';
	import ControlsButtonRow from '../ControlsButtonRow.svelte';
	import Slider from '../Slider.svelte';

	import { config } from '../../../widget/store';
	import Toggle from '../Toggle.svelte';

	function onToggleTitle(evt) {
		let checked = evt.target.checked;

		config.update(c => {
			c.title = checked ? 0 : 1;
			return c;
		});
	}

	function onToggleFade(evt) {
		let checked = evt.target.checked;

		config.update(c => {
			c.fade = checked ? 1 : 0;
			return c;
		});
	}
</script>

<ControlsSection title="Appearance">
	<ControlsButtonRow>
		<ControlsButton key="theme" value="light" style="width:16px; height:16px; background:white; border-width: 3px;" />
		<ControlsButton key="theme" value="light-rounded" style="width:16px; height:16px; border-radius:50%; background:white; border-width: 3px;" />
		<ControlsButton key="theme" value="dark" style="width:16px; height:16px;" />
		<ControlsButton key="theme" value="dark-rounded" style="width:16px; height:16px; border-radius:50%;" />
	</ControlsButtonRow>

	<Slider label="Text size" min={ 13 } max={ 18 } bind:value={ $config.text_size } />

	<Toggle label="Hide title" checked={ $config.title === 0 } disabled={ $config.size === 'tiny' } on:change={ onToggleTitle } />
	<Toggle label="Fade description" checked={ $config.fade === 1 } disabled={ $config.size === 'tiny' } on:change={ onToggleFade } />
</ControlsSection>
