<template>
	<vue-scrollbar :style="{ height: height, width: width }">
		<slot />
	</vue-scrollbar>
</template>

<script>
import VueScrollbar from "vue2-scrollbar";

export default {
	name: "TScrollbarLayout",
	components: {
		VueScrollbar
	},
	props: {
		height: {
			type: String,
			default: null
		},
		width: {
			type: String,
			default: null
		}
	}
};
</script>
