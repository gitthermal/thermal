<template>
	<t-flexbox :flex-grow="1">
		<VueScrollbar class="stats__scrollbar">
			<div class="container">
				<div class="stats__content">
					<div class="stats__content-group">
						<p>Commits per day</p>
						<ApexCharts type="area" :options="options" :series="series" />
					</div>
				</div>
			</div>
		</VueScrollbar>
	</t-flexbox>
</template>

<script>
import gitLog from "../../git/log";
import ApexCharts from "vue-apexcharts";
import VueScrollbar from "vue2-scrollbar";
import TFlexbox from "../../components/TLayouts/TFlexbox";

export default {
	name: "RepositoryStats",
	components: {
		ApexCharts,
		VueScrollbar,
		TFlexbox
	},
	data() {
		return {
			commitCountData: [],
			options: {
				chart: {
					id: "numberOfCommits"
				},
				xaxis: {
					type: "datetime",
					categories: []
				}
			},
			series: [
				{
					name: "commits",
					data: []
				}
			]
		};
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		}
	},
	created() {
		gitLog(this.currentRepository, [
			"--date=short",
			"--pretty=format:%ad"
		]).then(result => {
			this.commitCount(result[0].hash.split("\n"));
			this.series[0].data = this.commitCountData;
		});
	},
	methods: {
		commitCount(commits) {
			let graphData = [];
			let data = {
				x: "",
				y: 0
			};
			for (let i = 0; i < commits.length; i++) {
				if (commits[i] === commits[i + 1]) {
					data.x = commits[i];
					data.y += 1;
				} else {
					if (commits[i] === commits[i - 1]) {
						data.y += 1;
					}
					if (data.x === "") {
						data.x = commits[i];
						data.y = 1;
					}
					graphData.push(data);
					data = {
						x: "",
						y: 0
					};
				}
			}
			this.commitCountData = graphData;
		},
		statsLabel() {
			let array = [];
			for (let i = 0; i < this.commitCountData.length; i++) {
				array.push(this.commitCountData[i].date);
			}
			this.options.xaxis.categories = array;
		},
		statsDataSet() {
			let array = [];
			for (let i = 0; i < this.commitCountData.length; i++) {
				array.push(this.commitCountData[i].count);
			}
			this.series[0].data = array;
		}
	}
};
</script>

<style lang="sass">
.stats
	&__scrollbar
		max-height: 86vh

	&__content
		margin-top: 2rem
		margin-bottom: 4rem

		&-group
			border: 1px solid #eee
			border-radius: .3rem
			padding: 1rem

			p
				font-size: 0.875rem
				text-align: center
				margin-bottom: .3rem
</style>
