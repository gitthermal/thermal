<template>
	<t-flexbox align-items="center" class="status__item">
		<input
			v-model="status.stage"
			class="status__item-checkbox"
			type="checkbox"
			:value="status.path"
			@change="$emit('input', $event.target)"
		/>
		<label :title="status.path" :for="status.path">
			<t-flexbox>
				<p class="status__item-pathname">
					{{ filePath(status.path) }}
				</p>
				<p class="status__item-pathfile">
					{{ fileName(status.path) }}
				</p>
			</t-flexbox>
		</label>
		<div
			:style="`background-color: #${status.color}`"
			class="status__item-type ml-auto"
		>
			{{ status.symbol }}
		</div>
	</t-flexbox>
</template>

<script>
// components
import TFlexbox from "../TLayouts/TFlexbox";

export default {
	name: "StatusItem",
	components: {
		TFlexbox
	},
	props: {
		status: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	methods: {
		filePath(path) {
			if (path.lastIndexOf("/").toString() !== "-1") {
				return path.slice(0, path.lastIndexOf("/"));
			}
		},
		fileName(path) {
			if (path.lastIndexOf("/").toString() !== "-1") {
				return path.slice(path.lastIndexOf("/"), path.length);
			}
			return path;
		}
	}
};
</script>

<style lang="sass">
.status__item
	border-bottom: 1px solid #DEE0E3
	font-size: 12px
	color: #2E3034
	padding: 6px 10px
	cursor: pointer

	&:hover
		background-color: rgba(#EFEFEF, 0.4)

	&-checkbox
		margin-right: 5px

	&-pathname
			color: #BEBEBE

	&-type
		padding: 3px 5px
		color: white
		border-radius: 3px
</style>
