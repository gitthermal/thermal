<template>
	<VueScrollbar class="diff__preview">
		<div>
			<div
				v-for="(line, index) in preview"
				:key="index"
			>
				{{ line }}
			</div>
		</div>
	</VueScrollbar>
</template>

<script>
import VueScrollbar from "vue2-scrollbar";

export default {
	name: "DiffPreview",
	components: {
		VueScrollbar
	},
	props: {
		preview: {
			type: Array,
			required: true
		}
	}
};
</script>

<style lang="sass">
.diff__preview
	max-height: 90vh
</style>
