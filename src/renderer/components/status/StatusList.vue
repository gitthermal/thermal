<template>
	<div>
		<div v-for="(status, index) in statusList" :key="index">
		</div>
	</div>
</template>

<script>
export default {
	name: "StatusList",
	props: {
		statusList: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			stagedFiles: []
		};
	}
};
</script>
