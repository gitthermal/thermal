<template>
	<div>
		<content-loader
			v-for="index in 6"
			:key="index"
			primary-color="#efefef"
			secondary-color="#dee0e3"
			:height="30"
			:width="300"
			:speed="2"
			style="border-bottom: 1px solid #DEE0E3; display: flex"
		>
			<rect x="10" y="11" rx="0" ry="0" width="10" height="10" />
			<rect x="40" y="12" rx="0" ry="0" width="150" height="8" />
			<rect x="274" y="8" rx="0" ry="0" width="15" height="15" />
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
