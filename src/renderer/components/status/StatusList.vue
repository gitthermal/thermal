<template>
	<div>
		<div v-for="(status, index) in statusList" :key="index">
			<status-item :status="status" @input="stagedFile" />
		</div>
	</div>
</template>

<script>
// components
import StatusItem from "./StatusItem";

export default {
	name: "StatusList",
	components: {
		StatusItem
	},
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
	},
	methods: {
		stagedFile(event) {
			if (event.checked) {
				this.stagedFiles.push(event.value);
			} else {
				let index = this.stagedFiles.indexOf(event.value);
				this.stagedFiles.splice(index, 1);
			}
		}
	}
};
</script>
