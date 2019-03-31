<template>
  <div v-show="this.$store.state.workspace.model.exportCommitData" class="model--small">
    <div class="model__section model__header">
      <h6 class="model__header__title">Export commit data</h6>
      <div @click="closeModel()" class="model__header__close">
        <closeIcon/>
      </div>
    </div>
    <div class="model__section model__body d-flex flex-row">
      <inputTextLabel
        type="text"
        name="fileName"
        label="Name"
        placeholder="File name"
        class="model__body__input"
      />
      <inputTextLabel
        type="text"
        name="filePath"
        label="Path"
        placeholder="File path"
        class="model__body__input"
      />
    </div>
    <div class="model__section model__footer">
      <primaryButton @click.native="exportDetail()" class="ml-auto" text="Export"/>
    </div>
  </div>
</template>

<script>
import closeIcon from "../icon/close"
import primaryButton from "../atoms/primaryButton"
import inputTextLabel from "../inputTextLabel"
const fs = require("fs")

export default {
	name: "exportCommitData",
	data() {
		return {
			export: {
				name: "",
				path: ""
			}
		}
	},
	components: {
		closeIcon,
		inputTextLabel,
		primaryButton
	},
	computed: {
		commitInformation() {
			return this.$store.getters["history/getCommitInformation"]
		}
	},
	methods: {
		exportDetail() {
			let commitData = JSON.stringify(this.commitInformation)
			console.log(commitData)
			fs.writeFileSync(
				this.export.path + this.export.name + ".json",
				commitData
			)
		},
		closeModel() {
			this.$store.dispatch("model/showModelPlaceholder")
			this.$store.dispatch("workspace/showExportCommitData")
		}
	}
}
</script>

<style lang='sass'>
.model__body__input
	&:not(:last-child)
		margin-right: .8rem
</style>
