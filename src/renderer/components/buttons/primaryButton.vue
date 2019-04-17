<template>
	<a
		:style="{
			...defaultStyle,
			marginTop: marginTop,
			marginBottom: marginBottom,
			marginLeft: marginLeft,
			marginRight: marginRight,
			paddingTop: paddingTop,
			paddingBottom: paddingBottom,
			paddingLeft: paddingLeft,
			paddingRight: paddingRight,
			cursor: cursor,
			fontSize: fontSize + 'rem',
			fontWeight: fontWeight,
			color: color,
			backgroundColor: backgroundColor,
			borderRadius: borderRadius + 'rem',
			opacity: opacity,
			width: width,
			height: height,
			border: borderWidth + 'px ' + borderStyle + ' #' + borderColor
		}"
	>{{ text }}</a>
</template>

<script>
export default {
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
		marginTop: {
			type: String,
			default: null
		},
		marginBottom: {
			type: String,
			default: null
		},
		marginLeft: {
			type: String,
			default: null
		},
		marginRight: {
			type: String,
			default: null
		},
		paddingTop: {
			type: String,
			default: "0.5rem"
		},
		paddingBottom: {
			type: String,
			default: "0.5rem"
		},
		paddingLeft: {
			type: String,
			default: "1rem"
		},
		paddingRight: {
			type: String,
			default: "1rem"
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
		},
		width: {
			type: String,
			default: null
		},
		height: {
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
