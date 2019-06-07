<template>
	<div class="t-card" :style="{ maxWidth: cardSize }">
		<slot />
	</div>
</template>

<script>
export default {
	name: "TCard",
	props: {
		width: {
			type: [String, Number],
			default: "medium"
		}
	},
	computed: {
		cardSize() {
			if (!isNaN(this.width)) {
				return this.width + "px";
			} else {
				switch (this.width) {
					case "small":
						return "450px";
					case "medium":
					default:
						return "700px";
					case "large":
						return "100%";
				}
			}
		}
	}
};
</script>

<style lang="sass">
.t-card
	background-color: white
	box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)
	border-radius: .35rem
	margin-left: 20px
	margin-right: 20px
	width: 100%
</style>
