<template>
	<div class="commit__detail">
		<t-flexbox flex-direction="row" class="commit__detail__author">
			<img
				class="commit__detail__author__image"
				src="../../../../static/image/user_avatar.png"
			/>
			<div>
				<h6 class="commit__detail__author__name">
					{{ commitData.author.name }}
				</h6>
				<p class="commit__detail__author__email">
					{{ commitData.author.email }}
				</p>
			</div>
		</t-flexbox>
		<div class="commit__detail__summary">
			<div class="commit__detail__summary__title">
				{{ commitData.title }}
			</div>
			<div
				v-if="commitData.description"
				class="commit__detail__summary__description"
			>
				{{ commitData.description }}
			</div>
		</div>
		<div class="commit__detail__meta">
			<div v-if="commitData.author.name" class="commit__detail__meta__item">
				Author:
				<p>
					{{ commitData.author.name }}
					<!-- eslint-disable-next-line vue/no-parsing-error -->
					<{{ commitData.author.email }}>
				</p>
			</div>
			<div v-if="commitData.author.date" class="commit__detail__meta__item">
				Author Date:
				<p>{{ commitData.author.date }}</p>
			</div>
			<div v-if="commitData.committer.name" class="commit__detail__meta__item">
				Committer:
				<p>
					{{ commitData.committer.name }}
					<!-- eslint-disable-next-line vue/no-parsing-error -->
					<{{ commitData.committer.email }}>
				</p>
			</div>
			<div v-if="commitData.committer.date" class="commit__detail__meta__item">
				Committer Date:
				<p>{{ commitData.committer.date }}</p>
			</div>
			<div v-if="commitData.meta.refs" class="commit__detail__meta__item">
				Refs:
				<p>{{ commitData.meta.refs }}</p>
			</div>
			<div v-if="commitId" class="commit__detail__meta__item">
				Commit Hash:
				<p>{{ commitId }}</p>
			</div>
			<div v-if="commitData.meta.tree_hash" class="commit__detail__meta__item">
				Tree Hash:
				<p>{{ commitData.meta.tree_hash }}</p>
			</div>
			<div
				v-if="commitData.meta.parent_hash"
				class="commit__detail__meta__item"
			>
				Parent Hash:
				<p>{{ commitData.meta.parent_hash }}</p>
			</div>
		</div>
		<div class="commit__detail__files">
			<div class="commit__detail__files__summary">
				Showing {{ commitData.files.list.length }} changed files with
				{{ commitData.files.additions ? commitData.files.additions : "0" }}
				additions and
				{{ commitData.files.deletion ? commitData.files.additions : "0" }}
				deletion
			</div>
			<div
				v-for="file in commitData.files.list"
				:key="file"
				class="commit__detail__files__list"
				@click="commitHistoryPreview(commitData.meta.commit_hash, file)"
			>
				{{ file }}
			</div>
		</div>
	</div>
</template>

<script>
// mixins
import repositoryData from "../../mixins/repositoryData";
import showMixin from "../../git/show";
import diffMixin from "../../git/diff";
import trimFilePathMixin from "../../mixins/trimFilePath";
import repositoryDataMixin from "../../mixins/repositoryData";
import TFlexbox from "../TLayouts/TFlexbox";

export default {
	name: "CommitInformation",
	components: {
		TFlexbox
	},
	mixins: [repositoryData],
	props: {
		commitId: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			commitData: {
				title: "",
				description: "",
				author: {
					name: "",
					email: "",
					date: ""
				},
				meta: {
					tree_hash: "",
					parent_hash: "",
					refs: ""
				},
				committer: {
					name: "",
					email: "",
					date: ""
				},
				files: {
					additions: "",
					deletion: "",
					list: []
				}
			}
		};
	},
	mounted() {
		this.getcommitData();
	},
	methods: {
		getcommitData() {
			this.getAuthorDetail(this.commitId);
			this.getCommitBody(this.commitId);
			this.getCommitMeta(this.commitId);
			this.getFilesDetail(this.commitId);
		},
		getAuthorDetail(hash) {
			const params = [hash, "--format=%an %n %ae %n %ad"];
			showMixin(this.repositoryData.directoryPath, params).then(result => {
				let output = result.split("\n");
				this.commitData.author.name = output[0].trim();
				this.commitData.author.email = output[1].trim();
				this.commitData.author.date = output[2].trim();
			});
		},
		getCommitBody(hash) {
			const params = [hash, "--format=%s %n << %n %b %n >>"];
			showMixin(this.repositoryData.directoryPath, params).then(result => {
				let output = result.split("\n");
				let title = output[0].trim();
				let description;
				let commitDescriptionStart;
				let commitDescriptionEnd;
				for (let i = 0; i < output.length; i++) {
					if (output[i].trim() === "<<") {
						commitDescriptionStart = i;
					}
					if (output[i].trim() === ">>") {
						commitDescriptionEnd = i;
					}
				}
				if (commitDescriptionEnd - commitDescriptionStart > 2) {
					description = output
						.slice(commitDescriptionStart + 1, commitDescriptionEnd)
						.toString()
						.trim();
				}
				this.commitData.title = title;
				this.commitData.description = description;
			});
		},
		getCommitMeta(hash) {
			const params = [hash, "--format=%cn %n %ce %n %cd %n %d %n %T %n %P"];
			showMixin(this.repositoryData.directoryPath, params).then(result => {
				let output = result.split("\n");
				this.commitData.committer.name = output[0].trim();
				this.commitData.committer.email = output[1].trim();
				this.commitData.committer.date = output[2].trim();
				this.commitData.meta.refs = output[3].trim();
				this.commitData.meta.tree_hash = output[4].trim();
				this.commitData.meta.parent_hash = output[5].trim();
			});
		},
		getFilesDetail(hash) {
			const params = [hash, "--oneline", "--stat"];
			showMixin(this.repositoryData.directoryPath, params).then(result => {
				let output = result.split("\n");
				let additionDeletion = output[output.length - 2].split(", ");
				additionDeletion.shift();
				let addition;
				let deletion;

				for (let i = 0; i < additionDeletion.length; i++) {
					let commitMetaType = additionDeletion[i].slice(
						additionDeletion[i].length - 2,
						additionDeletion[i].length - 1
					);
					let additionDeletionNumber = additionDeletion[i].split(" ");
					if (commitMetaType === "+") {
						addition = additionDeletionNumber[0];
					}
					if (commitMetaType === "-") {
						deletion = additionDeletionNumber[0];
					}
				}

				this.commitData.files.addition = addition;
				this.commitData.files.deletion = deletion;
				this.commitData.files.list = trimFilePathMixin(
					output.slice(1, output.length - 2)
				);
			});
		},
		commitHistoryPreview(hash, path) {
			if (this.$store.state.settings.experimental.fileChanges) {
				this.$store.commit({
					type: "history/toggleFilePreview",
					isActive: true
				});
				const params = [hash + "^1", hash, "--", path];
				diffMixin(this.repositoryData.directoryPath, params).then(result => {
					let output = result.split("\n");
					output.splice(0, 4);
					this.$store.dispatch({
						type: "history/updateFilePreview",
						preview: output
					});
				});
			} else {
				console.log("You have not enabled File changes feature from settings.");
			}
		}
	}
};
</script>

<style lang="sass">
.commit__detail
	overflow: hidden

	&__author
		padding: 10px
		border-bottom: 1px solid #DEE0E3

		&__image
			width: 50px
			height: 50px
			margin-right: 10px

		&__name
			margin-bottom: 0

		&__email
			font-size: 12px
			color: #6C6F75

	&__summary
		padding: 10px
		border-bottom: 1px solid #DEE0E3

		&__description
			margin-top: 6px
			font-size: 12px

	&__meta
		padding: 10px
		border-bottom: 1px solid #DEE0E3

		&__item
			font-size: 12px
			color: #BEBEBE

			&:not(:last-child)
				margin-bottom: 4px

			p
				color: #2E3034

	&__files
		&__summary
			padding: 10px
			color: #BEBEBE
			font-size: 10px
			border-bottom: 1px solid #DEE0E3

		&__list
			border-bottom: 1px solid #DEE0E3
			font-size: 12px
			font-family: 'Space Mono', monospace
			color: #2E3034
			padding: 4px 10px
			cursor: pointer

			&:hover
				color: white
				background-color: #0366D6
</style>
