export default {
	props: {
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
			spacingProps: {
				marginTop: this.marginTop,
				marginBottom: this.marginBottom,
				marginLeft: this.marginLeft,
				marginRight: this.marginRight,
				paddingTop: this.paddingTop,
				paddingBottom: this.paddingBottom,
				paddingLeft: this.paddingLeft,
				paddingRight: this.paddingRight,
				width: this.width,
				height: this.height
			}
		};
	}
};
