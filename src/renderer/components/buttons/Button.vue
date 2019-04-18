<template>
	<a
		:style="{
			...defaultStyle,
			...spacingProps,
			cursor: cursor,
			fontSize: fontSize + 'rem',
			fontWeight: fontWeight,
			color: '#' + color,
			backgroundColor: '#' + backgroundColor,
			borderRadius: borderRadius + 'rem',
			opacity: opacity,
			border: borderWidth + 'px ' + borderStyle + ' #' + borderColor
		}"
	>{{ text }}</a>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";

export default {
	name: "Button",
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
		type: {
			type: String,
			default: "none"
		},
		color: {
			type: String,
			default: "ffffff",
		},
		backgroundColor: {
			type: String,
			default: "00adb5",
		},
		disable: {
			type: Boolean,
			default: false
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
			default: 1
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
	},
	mounted() {
		switch (this.appearance) {
			case "primary":
				this.primary();
				break;
			case "outline":
				this.outline();
				break;
			case "link":
				this.link();
				break;
		}
	},
	methods: {
		primary() {
			this.color = "ffffff";
			switch (this.type) {
				case "success":								
					this.backgroundColor = "43b581";
					break;
				case "warning":
					this.backgroundColor = "faa61a";
					break;
				case "danger":
					this.backgroundColor = "f04747";
					break;
				case "none":
					this.backgroundColor = "00adb5";
					break;
			}
		},
		outline() {
			this.backgroundColor = "ffffff";
			switch (this.type) {
				case "success":								
					this.color = "43b581";
					this.borderColor = "43b581";
					break;
				case "warning":
					this.color = "faa61a";
					this.borderColor = "faa61a";
					break;
				case "danger":
					this.color = "f04747";
					this.borderColor = "f04747";
					break;
				case "none":
					this.color = "00adb5";
					this.borderColor = "00adb5";
					break;
			}
		},
		link() {
			this.backgroundColor = "ffffff";
			this.borderColor = "ffffff";
			switch (this.type) {
				case "success":								
					this.color = "43b581";
					break;
				case "warning":
					this.color = "faa61a";
					break;
				case "danger":
					this.color = "f04747";
					break;
				case "none":
					this.color = "00adb5";
					break;
			}
		}
	}
};
</script>
