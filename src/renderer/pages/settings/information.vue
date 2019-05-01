<template>
	<div class="information">
		<div
			v-for="section in information"
			:key="section.name"
			class="information__section"
		>
			<h5>{{ section.name }}</h5>
			<table class="table">
				<tbody class="table__item-container">
					<tr v-for="item in section.data" :key="item.info" class="table__item">
						<td v-for="info in item" :key="info" class="table__item-line">
							{{ info }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		let opsys = process.platform;
		if (opsys === "darwin") {
			opsys = "MacOS";
		} else if (opsys === "win32" || opsys === "win64") {
			opsys = "Windows";
		} else if (opsys === "linux") {
			opsys = "Linux";
		}
		return {
			commitData: {},
			information: {
				app: {
					name: "App information",
					data: [
						["Version", `v${process.env.npm_package_version}`],
						["Environment", "Production"]
					]
				},
				os: {
					name: "Runtime environment",
					data: [
						["OS Type", opsys],
						["OS Platform", process.platform],
						["Node version", process.versions.node],
						["Electron version", process.versions.electron],
						["Chrome version", process.versions.chrome],
						["v8 version", process.versions.v8]
					]
				}
			}
		};
	},
	computed: {
		packageVersion() {
			return process.env.npm_package_version;
		}
	}
};
</script>

<style lang="sass" scoped>
.information

	h5
		margin-bottom: 1rem

	.table
		margin-bottom: 1.5rem
		width: 100%

		&__item
			display: flex
			justify-content: space-between
			border-bottom: 1px solid #EFEFEF

			&:hover
				background-color: #DEE0E3

		&__item-line
			padding: .4rem

			&:first-child
				font-weight: 500
</style>
