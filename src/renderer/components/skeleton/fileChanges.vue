<template>
	<div>
		<content-loader
			v-for="index in 3"
			:key="index"
			primary-color="#efefef"
			secondary-color="#dee0e3"
			:height="32"
			:width="299"
			:speed="2"
			style="border-bottom: 1px solid #DEE0E3"
		>
			<rect x="10" y="12" rx="0" ry="0" width="12" height="12" />
			<rect x="32" y="14" rx="0" ry="0" width="170" height="8" />
			<rect x="271" y="8" rx="0" ry="0" width="18" height="18" />
		</content-loader>
	</div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
	name: "LogSkeleton",
	components: {
		ContentLoader
	}
};
</script>
