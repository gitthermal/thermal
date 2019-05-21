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
			default: null
		},
		paddingBottom: {
			type: String,
			default: null
		},
		paddingLeft: {
			type: String,
			default: null
		},
		paddingRight: {
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
