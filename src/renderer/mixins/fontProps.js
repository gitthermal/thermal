export default {
	props: {
		// a prioritized list of one or more font family names 
		fontFamily: {
			type: String,
			default: 'inherit'
		},
		// size of the font in rems
		fontSize: {
			type: Number,
			default: 1
		},
		// specifies the weight (or boldness) of the font
		fontWeight: {
			type: Number,
			default: 400
		},
		// amount of spacing between lines
		lineHeight: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			fontProps: {
				fontFamily: this.fontFamily,
				fontSize: this.fontSize + "rem",
				fontWeight: this.fontWeight,
				lineHeight: this.lineHeight
			}
		};
	}
};
