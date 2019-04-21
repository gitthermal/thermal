<template>
	<VueScrollbar class="diff__preview">
		<div>
			<div
				v-for="(line, index) in filePreview"
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
	computed: {
		filePreview: function() {
			return this.$store.getters["history/getFilePreview"];
		}
	}
};
</script>

<style lang="sass">
.diff__preview
	max-height: 90vh
</style>
