<template>
	<div>
		<content-loader
			v-for="index in 6"
			:key="index"
			primary-color="#efefef"
			secondary-color="#dee0e3"
			:height="60"
			:width="300"
			:speed="2"
			style="border-bottom: 1px solid #DEE0E3"
		>
			<rect
				x="10"
				y="10"
				rx="0"
				ry="0"
				width="280"
				height="15"
			/>
			<rect
				x="10"
				y="35"
				rx="0"
				ry="0"
				width="15"
				height="15"
			/>
			<rect
				x="32"
				y="38"
				rx="0"
				ry="0"
				width="100"
				height="10"
			/>
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
