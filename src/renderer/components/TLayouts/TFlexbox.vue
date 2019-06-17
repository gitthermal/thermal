<template>
	<div
		:style="{
			display: 'flex',
			flexDirection: flexDirection,
			justifyContent: justifyContent,
			flexWrap: flexWrap,
			alignItems: alignItems,
			alignSelf: alignSelf,
			flexGrow: flexGrow
		}"
	>
		<slot />
	</div>
</template>

<script>
export default {
	name: "TFlexbox",
	props: {
		flexDirection: {
			type: String,
			default: null
		},
		flexWrap: {
			type: String,
			default: null
		},
		justifyContent: {
			type: String,
			default: null
		},
		alignItems: {
			type: String,
			default: null
		},
		alignSelf: {
			type: String,
			default: null
		},
		flexGrow: {
			type: Number,
			default: null
		}
	}
};
</script>
