<template>
	<a
		:class="buttonType"
		class="button button--outline"
	>
		{{ text }}
	</a>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: ""
		}
	},
	computed: {
		buttonType() {
			switch (this.type) {
				case "danger":
					return "button--outline--danger";
				default:
					return "button--outline--normal";
			}
		}
	}
};
</script>

<style lang="sass">
.button--outline
	background: none

.button--outline--normal
	border: 1px solid #00adb5
	color: #00adb5

.button--outline--danger
	border: 1px solid #f04747
	color: #f04747
</style>
