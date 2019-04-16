<template>
	<a
		:style="{
			marginTop: marginTop + 'rem',
			marginBottom: marginBottom + 'rem',
			marginLeft: marginLeft + 'rem',
			marginRight: marginRight + 'rem',
			paddingTop: paddingTop + 'rem',
			paddingBottom: paddingBottom + 'rem',
			paddingLeft: paddingLeft + 'rem',
			paddingRight: paddingRight + 'rem',
			cursor: cursor,
			fontSize: fontSize + 'rem',
			fontWeight: fontWeight,
			color: color,
			backgroundColor: backgroundColor,
			borderRadius: borderRadius + 'rem',
			opacity: opacity
		}"
		style="{
			user-select: none
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
			type: Number,
			default: null
		},
		marginBottom: {
			type: Number,
			default: null
		},
		marginLeft: {
			type: Number,
			default: null
		},
		marginRight: {
			type: Number,
			default: null
		},
		paddingTop: {
			type: Number,
			default: 0.5
		},
		paddingBottom: {
			type: Number,
			default: 0.5
		},
		paddingLeft: {
			type: Number,
			default: 1
		},
		paddingRight: {
			type: Number,
			default: 1
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
		}
	},
	computed: {
		color() {
			switch (this.appearance) {
				case "primary":
					return "#ffffff";
				default:
					return "#00adb5";
			}
		},
		backgroundColor() {
			switch (this.appearance) {
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
