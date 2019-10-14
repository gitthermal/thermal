<template>
	<div class="information">
		<div v-for="section in information" :key="section.name" class="section">
			<h5>{{ section.name }}</h5>
			<table class="table">
				<tbody class="item-container">
					<tr v-for="item in section.data" :key="item.info" class="item">
						<td v-for="info in item" :key="info" class="item-line">
							{{ info }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import packageJson from "../../../../package.json";

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
						["Version", `v${packageJson.version}`],
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

		.item
			display: flex
			justify-content: space-between
			margin-top: 1.2rem
    	padding: 0.2rem

			&:hover
				background-color: #DEE0E3

		.item-line
			padding: .4rem

			&:first-child
				font-weight: 500
</style>
