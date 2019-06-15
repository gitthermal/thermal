<template>
	<div class="workspace">
		<div ref="workspaceFiles" class="workspace__files">
			<div class="workspace__repository">
				<div
					ref="branchName"
					class="workspace__branch d-flex align-items-center"
				>
					<branchIcon />
					<p>{{ this.$store.state.commit.activeBranch }}</p>
				</div>
				<VueScrollbar class="workspace__changes__scrollbar">
					<fileChangesSkeleton
						v-if="this.$store.getters['commit/allFiles'].length < 1"
					/>
					<div v-else class="workspace__changes">
						<div
							v-for="file in this.$store.getters['commit/allFiles']"
							:key="file.path"
							class="workspace__changes__item d-flex align-items-center"
							@click="previewFileChange(file)"
						>
							<input
								v-show="getFeatureValue.commit"
								v-model="stagedFile"
								class="workspace__changes__item__checkbox"
								type="checkbox"
								:value="file.path"
							/>
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
							>
								{{ fileType(file) }}
							</div>
						</div>
					</div>
				</VueScrollbar>
			</div>
			<commitMessage
				ref="commitMessage"
				padding-top="10px"
				padding-bottom="10px"
				padding-left="10px"
				padding-right="10px"
			/>
		</div>
		<div class="workspace__preview">
			<diffPreview
				v-if="this.$store.state.workspace.filePreview.isActive"
				:preview="fileDiffPreview"
			/>
			<div v-else>
				No file selected.
			</div>
		</div>
	</div>
</template>

<script>
import statusMixin from "../../mixins/git/status";
import diffMixin from "../../mixins/git/diff";
import VueScrollbar from "vue2-scrollbar";
import commitMessage from "../../components/commit/commitMessage";
import branchIcon from "../../components/icon/branch";
import diffPreview from "../../components/diff/diffPreview";
import fileChangesSkeleton from "../../components/skeleton/fileChanges";

export default {
	name: "Workspace",
	components: {
		branchIcon,
		VueScrollbar,
		commitMessage,
		diffPreview,
		fileChangesSkeleton
	},
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
		};
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		},
		stagedFile: {
			get() {
				return this.$store.getters["commit/allStagedFiles"];
			},
			set(value) {
				this.$store.dispatch({
					type: "commit/updateStagedFiles",
					staged: value
				});
			}
		},
		getFeatureValue() {
			return this.currentRepository.features;
		},
		fileDiffPreview() {
			return this.$store.state.workspace.filePreview.preview;
		}
	},
	mounted() {
		this.gitStatus();
		this.previewFileChange(this.$store.getters["commit/allFiles"][0]);
	},
	methods: {
		gitStatus() {
			statusMixin(this.currentRepository).then(result => {
				this.$store.dispatch({
					type: "commit/updateActiveBranch",
					branch: result.current
				});
				this.$store.commit({
					type: "commit/files",
					files: result.files
				});
			});
		},
		fileType(file) {
			switch (file.working_dir) {
				case "M":
					return "M";
				case "D":
					return "D";
				case "?":
					return "A";
				case " ":
					switch (file.index) {
						case "M":
							return "M";
						case "D":
							return "D";
						case "R":
							return "R";
						case "A":
							return "A";
					}
			}
		},
		fileTypeColor(file) {
			switch (file.working_dir) {
				case "M":
					return this.fileColors.modify;
				case "D":
					return this.fileColors.delete;
				case "?":
					return this.fileColors.new;
				case " ":
					switch (file.index) {
						case "M":
							return this.fileColors.modify;
						case "D":
							return this.fileColors.delete;
						case "R":
							return this.fileColors.rename;
						case "A":
							return this.fileColors.new;
					}
			}
		},
		filePath(path) {
			if (path.lastIndexOf("/").toString() !== "-1") {
				return path.slice(0, path.lastIndexOf("/"));
			}
		},
		fileName(path) {
			if (path.lastIndexOf("/").toString() !== "-1") {
				return path.slice(path.lastIndexOf("/"), path.length);
			}
			return path;
		},
		previewFileChange(file) {
			this.$store.commit({
				type: "workspace/toggleFilePreview",
				isActive: true
			});
			const params = ["HEAD", "--", `:${file.path}`];
			diffMixin(this.currentRepository, params).then(result => {
				let output = result.split("\n");
				output.splice(0, 3);
				this.$store.commit({
					type: "workspace/filePreview",
					preview: output
				});
			});
		}
	}
};
</script>

<style lang="sass">
.workspace
	display: flex
	flex-direction: row

	&__files
		border-right: 1px solid #DEE0E3
		width: 300px

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

	&__preview
		padding: 1rem
</style>
