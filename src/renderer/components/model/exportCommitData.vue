<template>
	<div
		v-show="this.$store.state.model.model.exportCommitData"
		class="model--small"
	>
		<div class="model__section model__header">
			<h6 class="model__header__title">
				Export commit data
			</h6>
			<div class="model__header__close" @click="closeModel()">
				<closeIcon />
			</div>
		</div>
		<div class="model__section model__body d-flex flex-row">
			<inputTextLabel
				v-model="exportFileName"
				name="fileName"
				label="Name"
				placeholder="File name"
				class="model__body__input"
			/>
			<inputTextLabel
				v-model="exportFilePath"
				name="filePath"
				label="Path"
				placeholder="File path"
				class="model__body__input"
			/>
		</div>
		<div class="model__section model__footer">
			<Button
				margin-left="auto"
				text="Export"
				appearance="primary"
				@click.native="exportDetail()"
			/>
		</div>
	</div>
</template>

<script>
import closeIcon from "../icon/close";
import Button from "../buttons/Button";
import inputTextLabel from "../input/inputTextLabel";
const fs = require("fs");

export default {
	name: "ExportCommitData",
	components: {
		closeIcon,
		inputTextLabel,
		Button
	},
	data() {
		return {
			exportFileName: "",
			exportFilePath: ""
		};
	},
	computed: {
		commitInformation() {
			return this.$store.getters["history/getCommitInformation"];
		}
	},
	methods: {
		exportDetail() {
			let commitData = JSON.stringify(this.commitInformation);
			console.log(commitData);
			fs.writeFileSync(
				this.exportFilePath + this.exportFileName + ".json",
				commitData
			);
			this.closeModel();
		},
		closeModel() {
			this.$store.dispatch("model/showExportCommitData");
		}
	}
};
</script>

<style lang="sass">
.model__body__input
	width: 100%

	&:not(:last-child)
		margin-right: .8rem
</style>
