<template>
	<t-scrollbar padding="0.5rem" height="90vh">
		<div>
			<div v-for="(line, index) in preview" :key="index">
				{{ line }}
			</div>
		</div>
	</t-scrollbar>
</template>

<script>
import TScrollbar from "../TLayouts/TScrollbar";

export default {
	name: "DiffPreview",
	components: {
		TScrollbar
	},
	props: {
		preview: {
			type: Array,
			required: true
		}
	}
};
</script>
