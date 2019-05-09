import { Bar } from "vue-chartjs";

export default {
	extends: Bar,
	props: {
		data: {
			type: Object,
			default: null
		},
		options: {
			type: Object,
			default: null
		}
	},
	mounted() {
		this.renderChart(this.data, this.options);
	}
};
