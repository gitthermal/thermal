<template>
	<VueScrollbar class="diff__preview">
		<div>
			<div v-for="(data, index) in preview" :key="index">
				<diff-line
				/>
			</div>
		</div>
	</VueScrollbar>
</template>

<script>
import VueScrollbar from "vue2-scrollbar";
import DiffLine from "./diffLine";

export default {
	name: "DiffPreview",
	components: {
		VueScrollbar,
		DiffLine
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
