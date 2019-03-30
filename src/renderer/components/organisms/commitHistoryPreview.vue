<template>
		<div v-for="(line, index) in filePreview" :key="index">
			{{ line }}
	<VueScrollbar class="commit__preview">
		</div>
	</VueScrollbar>
</template>

<script>
	export default {
		name: "commitHistoryPreivew",
		computed: {
			filePreview: function() {
				return this.$store.getters["history/getFilePreview"]
			}  
		}
import VueScrollbar from "vue2-scrollbar"

	components: {
		VueScrollbar
	},
	}
</script>

<style lang='sass'>
.commit__preview
	max-height: 90vh
</style>
