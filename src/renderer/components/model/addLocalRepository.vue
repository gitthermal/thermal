<template>
	<div
		v-show="this.$store.state.model.model.addLocalRepository"
		class="model--small"
	>
		<div class="model__section model__header">
			<h6 class="model__header__title">
				Add local repository
			</h6>
			<div
				class="model__header__close"
				@click="closeModel()"
			>
				<closeIcon />
			</div>
		</div>
		<div class="model__section model__body flex-column">
			<inputText
				v-model.trim="pathToRepository"
				v-focus
				name="pathToRepository"
				placeholder="Local path to repository"
				@keyup.esc.native="closeModel"
				@keyup.enter.native="addRepository"
			/>
			<input
				ref="fileInput"
				type="file"
				name="folderSelector"
				webkitdirectory
				style="display: none"
				@change="fileSectorInput"
			>
			<primaryButton
				text="Select"
				margin-left=".4rem"
				@click.native="$refs.fileInput.click()"
			/>
		</div>
		<div class="model__section model__footer">
			<primaryButton
				class="ml-auto"
				text="Add repository"
				@click.native="addRepository(pathToRepository)"
			/>
		</div>
	</div>
</template>

<script>
import closeIcon from "../icon/close";
import inputText from "../input/inputText";
import primaryButton from "../buttons/primaryButton";
import addRepository from "../../mixins/addRepository";

export default {
	name: "AddLocalRepository",
	components: {
		closeIcon,
		inputText,
		primaryButton
	},
	directives: {
		focus: {
			inserted: function(el) {
				el.focus();
			}
		}
	},
	mixins: [addRepository],
	data() {
		return {
			pathToRepository: ""
		};
	},
	methods: {
		fileSectorInput(event) {
			this.pathToRepository = event.target.files[0].path.split("\\").join("/");
		},
		addRepository(path) {
			this.localRepository(path);
			this.pathToRepository = "";
			this.closeModel();
		},
		closeModel() {
			this.$store.dispatch("model/showAddLocalRepositoryModel");
		}
	}
};
</script>

<style lang="sass">
.model

	&__header
		border-bottom: 1px solid #eee

	&__body
		border-bottom: 1px solid #eee

	&__error
		font-size: 11px
		margin-top: 10px
</style>
