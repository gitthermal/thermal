<template>
	<a
		:style="{
			...defaultStyle,
			...spacingProps,
			cursor: cursor,
			fontSize: fontSize + 'rem',
			fontWeight: fontWeight,
			color: color,
			backgroundColor: backgroundColor,
			borderRadius: borderRadius + 'rem',
			opacity: opacity,
			border: borderWidth + 'px ' + borderStyle + ' #' + borderColor
		}"
	>{{ text }}</a>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";

export default {
	mixins: [spacingProps],
	props: {
		appearance: {
			type: String,
			required: true,
			validator: function(value) {
				const appearance = ["primary", "outline", "link"];
				return appearance.filter(type => type === value);
			}
		},
		text: {
			type: String,
			required: true
		},
		disable: {
			type: Boolean,
			default: false
		},
			type: String,
		},
			type: String,
		},
			type: String,
		},
		},
		fontSize: {
			type: Number,
			default: 0.875
		},
		fontWeight: {
			type: Number,
			default: 400
		},
		borderRadius: {
			type: Number,
			default: 5
		},
		borderWidth: {
			type: Number,
			default: null
		},
		borderStyle: {
			type: String,
			default: "solid"
		},
		borderColor: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			defaultStyle: {
				display: "inline-block",
				textAlign: "center",
				userSelect: "none"
			}
		};
	},
	computed: {
		color() {
			switch (this.appearance) {
				case "primary":
					return "#ffffff";
				case "outline":
					return "#00adb5";
				default:
					return "#00adb5";
			}
		},
		backgroundColor() {
			switch (this.appearance) {
				case "outline":
					return "#ffffff";
				default:
					return "#00adb5";
			}
		},
		cursor() {
			if (!this.disable) {
				return "pointer";
			} else {
				return "not-allowed";
			}
		},
		opacity() {
			if (this.disable) {
				return 0.6;
			} else {
				return 1;
			}
		}
	}
};
</script>
