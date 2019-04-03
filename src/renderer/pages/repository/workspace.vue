<template>
	<div class="workspace">
		<div class="workspace__repository">
			<div class="workspace__branch d-flex align-items-center">
				<branchIcon/>
				<p>{{ this.$store.state.commit.activeBranch }}</p>
			</div>
			<VueScrollbar class="workspace__changes__scrollbar">
				<div class="workspace__changes">
					<div
						v-for="file in this.$store.getters['commit/allFiles']"
						:key="file.path"
						class="workspace__changes__item d-flex align-items-center"
					>
						<input
							v-show="getFeatureValue.commit"
							class="workspace__changes__item__checkbox"
							type="checkbox"
							:value="file.path"
							v-model="stagedFile"
						>
						<label
							class="workspace__changes__item__path"
							:title="file.path"
							:for="file.path"
						>
							<p class="workspace__changes__item__path__name">
								{{ filePath(file.path) }}
							</p>
							<p class="workspace__changes__item__path__file">
								{{ fileName(file.path) }}
							</p>
						</label>
						<div
							:style="'background-color: #' + fileTypeColor(file)"
							class="workspace__changes__item__type ml-auto"
						>{{ fileType(file) }}</div>
					</div>
				</div>
			</VueScrollbar>
		</div>
		<div v-show="getFeatureValue.commit" class="commit-message">
			<inputText
				v-model="commitMessageTitle"
				name="commitMessageTitle"
				placeholder="Summary (required)"
				class="commit-message__title"
			/>
			<primaryButton
				:class="{ 'button--disable': !this.stagedFileLength > 0 }"
				class="commit-message__button w-100"
				@click.native="commitMessageButton()"
				:text="'Commit to ' + this.$store.state.commit.activeBranch"
			/>
		</div>
	</div>
</template>

<script>
import git from "simple-git/promise"
import VueScrollbar from "vue2-scrollbar"
import branchIcon from "../../components/icon/branch"
import inputText from "../../components/input/inputText"
import primaryButton from "../../components/buttons/primaryButton"
import * as Sentry from "@sentry/electron"

export default {
	name: "workspace",
	data() {
		return {
			commitMessageTitle: "",
			fileColors: {
				modify: "57C9F6",
				new: "7CCD5F",
				delete: "EC746E",
				rename: "3585de",
				other: "E2E2E2"
			}
		}
	},
	components: {
		branchIcon,
		inputText,
		primaryButton,
		VueScrollbar
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"]
		},
		stagedFile: {
			get() {
				return this.$store.getters["commit/allStagedFiles"]
			},
			set(value) {
				this.$store.dispatch({
					type: "commit/updateStagedFiles",
					staged: value
				})
			}
		},
		stagedFileLength() {
			return this.$store.state.commit.staged.length
		},
		getFeatureValue() {
			return this.currentRepository.features
		}
	},
	methods: {
		async gitStatus() {
			let status = await git(
				this.currentRepository.path
			).status()
			try {
				this.$store.dispatch({
					type: "commit/updateActiveBranch",
					branch: status.current
				})
				this.$store.dispatch({
					type: "commit/updateFiles",
					files: status.files
				})
			} catch (error) {
				Sentry.captureException(error)
				let errorMessage = "Error fetching git status."
				console.log(errorMessage)
				Sentry.captureMessage(errorMessage, status)				
			}
		},
		fileType(file) {
			switch (file.working_dir) {
			case "M":
				return "M"
			case "D":
				return "D"
			case "?":
				return "A"
			case " ":
				switch (file.index) {
				case "M":
					return "M"
				case "D":
					return "D"
				case "R":
					return "R"
				case "A":
					return "A"
				}
			}
		},
		fileTypeColor(file) {
			switch (file.working_dir) {
			case "M":
				return this.fileColors.modify
			case "D":
				return this.fileColors.delete
			case "?":
				return this.fileColors.new
			case " ":
				switch (file.index) {
				case "M":
					return this.fileColors.modify
				case "D":
					return this.fileColors.delete
				case "R":
					return this.fileColors.rename
				case "A":
					return this.fileColors.new
				}
			}
		},
		async commitMessageButton() {
			git(this.currentRepository.path).add(this.$store.getters["commit/allStagedFiles"])
			let commit = git(this.currentRepository.path).commit(this.commitMessageTitle)
			try {
				console.log(commit)
				this.commitMessageTitle = ""
			} catch (error) {
				Sentry.captureException(error)
				let errorMessage = "Unable to make commit."
				console.log(errorMessage)
				Sentry.captureMessage(errorMessage, commit)
			}
		},
		filePath(path) {
			if (path.lastIndexOf("/").toString() !== "-1") {
				return path.slice(0, path.lastIndexOf("/"))
			}
		},
		fileName(path) {
			if (path.lastIndexOf("/").toString() !== "-1") {
				return path.slice(path.lastIndexOf("/"), path.length)
			}
			return path
		}
	},
	mounted() {
		this.gitStatus()
	}
}
</script>

<style lang='sass'>
	.workspace
		border-right: 1px solid #DEE0E3
		width: 400px

		&__branch
			background-color: #EFEFEF
			padding: 10px 20px
			border-bottom: 1px solid #DEE0E3
			position: sticky
			top: 0

			svg
				width: 20px
				height: 20px
				stroke: #6C6F75

			p
				margin-left: 10px
				font-size: 14px
				font-weight: 600

		&__changes

			&__scrollbar
				height: calc(86vh - (41px + 102px))

			&__item
				border-bottom: 1px solid #DEE0E3
				font-size: 12px
				color: #2E3034
				padding: 6px 10px				
				cursor: pointer

				&__checkbox
					margin-right: 5px

				&__path
					display: flex

					&__name
						color: #BEBEBE

				&__type
					padding: 3px 5px
					color: white
					border-radius: 3px

				&:hover
					background-color: rgba(#EFEFEF, .4)
		
	.commit-message
		padding: 10px
		border-top: 1px solid #DEE0E3

		&__title
			margin-bottom: 15px
</style>
