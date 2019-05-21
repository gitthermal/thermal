export default {
	props: {
		borderRadius: {
			type: Number,
			default: null
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
			borderProps: {
				borderRadius: this.borderRadius + "rem",
				borderWidth: this.borderWidth + "px",
				borderStyle: this.borderStyle,
				borderColor: "#" + this.borderColor
			}
		};
	}
};
