<template>
	<div>
		<div v-for="(line, index) in filePreview" :key="index">
			{{ line }}
		</div>
	</div>
</template>

<script>
	export default {
		name: "commitHistoryPreivew",
		computed: {
			filePreview: function() {
				return this.$store.getters["history/getFilePreview"]
			}  
		}
	}
</script>

<style lang='sass'>

</style>
