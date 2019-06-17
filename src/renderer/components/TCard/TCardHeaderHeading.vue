<template>
	<div class="t-card__header-heading">
		{{ heading }}
	</div>
</template>

<script>
export default {
	name: "TCardHeaderHeading",
	props: {
		heading: {
			type: String,
			default: ""
		}
	}
};
</script>
