<template>
	<img
		:src="src"
		:alt="title"
		:style="{
			...spacingProps,
			...borderProps
		}"
		class="avatar__image"
	/>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";
import borderProps from "../../mixins/borderProps";

export default {
	name: "Avatar",
	mixins: [spacingProps, borderProps],
	props: {
		title: {
			type: String,
			required: true
		},
		src: {
			type: String,
			default: ""
		}
	}
};
</script>
