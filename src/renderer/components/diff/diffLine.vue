<template>
	<div class="diff__preview-line">
		<div :style="{ backgroundColor: '#' + color.gutter }" class="diff__gutter">
			<div
				:style="{ borderRightColor: '#' + color.border }"
				class="diff__gutter-left"
			>
			</div>
			<div
				:style="{ borderRightColor: '#' + color.border }"
				class="diff__gutter-right"
			>
			</div>
		</div>
		<div :style="{ backgroundColor: '#' + color.code }" class="diff__code">
			<div class="diff__code-status">
				{{ status }}
			</div>
			<div class="diff__code-line">
				{{ code }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DiffLine",
	props: {
		color: {
			type: Object,
			required: true
		},
		gutter: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		code: {
			type: String,
			required: true
		}
	}
};
</script>

<style lang="sass">
.diff
	&__preview-line, &__gutter, &__code
		display: flex
		flex-direction: row

	&__gutter, &__code
		font-size: .875rem

	&__gutter-left, &__gutter-right, &__code
		padding-top: 6px
		padding-bottom: 6px

	&__gutter-left, &__gutter-right
		padding-left: 1.125rem
		padding-right: 10px
		border-right:
			width: 1px
			style: solid

	&__code
		padding-left: 4px
		padding-right: 4px

		&-status
			margin-right: .875rem
</style>
