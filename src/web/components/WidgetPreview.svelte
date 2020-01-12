<script>
	const GAME_IDS = [
		'DDF1B072-5419-11E4-A42B-C4BA6D5C0135', // parkies
		'10BB37D4-3DD2-11E4-9FCF-CCC114C6109A', // singularity
		'EAABF2EC-EA83-11E2-AB94-6CE557FC3ABA', // elements
		'396472F6-F89C-11E4-9559-0FCC90239C01', // ecologies
		'AAF1DE32-5A32-11E2-92F9-E04C23798A35', // table golf
		'E2B51520-C722-11E2-83FE-AC6043F73D35', // the captain is dead
		'F91A62AC-78B5-11E4-AC5B-34C8C16FEBC5', // the captain is dead episode 2
		'F2D7590A-9AB8-11E6-B195-3BEA5117CDA6', // the forty servants
		'4A8EC098-4783-11E8-AF4D-99FE83B74B37', // croopo origins
		'FBEDEDCA-D3E1-11E7-8E92-9A3DD6643F7E', // space princess
		'C24F26AA-1CD6-11E2-9938-EB28AE83255E', // zerpang
		'57A70BD8-8FDB-11E2-8852-C977792D7C77', // doomworks
		'4F45F0FE-B575-11E5-B013-A4BAA22D79F0', // burger dice
		'A880DE36-C9AA-11E7-B3AC-BD3D94A6FE1D', // i smell a rat
		'FCA67274-CF03-11E7-803E-0FD5461459D7', // weevils
		'20E621F0-6B8C-11E8-BD59-2CBC75A431D5', // rainbow rabbits
		'FB063FC6-80F2-11E2-809F-0BBB2172D019', // host
	];

	const SIZES = ['tiny', 'narrow', 'large', 'wide'];
	const THEMES = ['light', 'light-rounded', 'dark', 'dark-rounded'];

	const pickRandom = arr => arr[Math.floor(Math.random() * (arr.length - 1))];
	const randomRange = (min, max) => max;//min + Math.ceil(Math.random() * (max - min));
	const randomBool = threshold => Math.random() > threshold ? 1 : 0;

	function generate() {
		let width, height;
		let size = pickRandom(SIZES);

		if (size === 'tiny') {
			width = '155px';
			height = '205px';
		} else if (size === 'narrow') {
			width = '210px';
			height = randomRange(320, 450) + 'px';
		} else if (size === 'large') {
			width = '500px';
			height = randomRange(260, 450) + 'px';
		} else if (size === 'wide') {
			width = '500px';
			height = '155px';
		}

		return {
			id: pickRandom(GAME_IDS),
			size,
			width,
			height,
			link: randomBool(0.4),
			title: randomBool(0.2),
			fade: randomBool(0.8),
			theme: pickRandom(THEMES),
		};
	}

	let widget = generate();
</script>


<iframe
	class="widget-preview"
	style="width:{ widget.width };height:{ widget.height };border:none;border-radius:{ widget.theme.endsWith('rounded') ? 26 : 6}px"
	src="/widget?id={ widget.id }&size={ widget.size }&width={ widget.width }&height={ widget.height }&theme={ widget.theme }"
	on:load></iframe>


<style>
.widget-preview {
	pointer-events: none;
	box-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.15);
}
</style>
