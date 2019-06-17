<template>
	<t-flexbox flex-direction="column">
		<a
			class="history__item"
			@mouseenter="showFiles(data.hash)"
			@mouseleave="hideFiles()"
		>
			<div :title="data.message" class="history__item__title">
				{{ data.message }}
			</div>
			<t-flexbox
				flex-direction="row"
				align-items="center"
				class="history__item__author"
			>
				<img
					class="history__item__author__image"
					src="../../../../static/image/user_avatar.png"
				/>
				{{ data.author_name }} committed {{ data.date | moment("from", "now") }}
			</t-flexbox>
		</a>
		<t-flexbox
			v-show="files.isActive"
			flex-direction="column"
			class="history__files"
		>
			<div class="history__files__dropdown">
				<div
					v-for="item in files.list"
					:key="item"
					class="history__files__dropdown__item"
				>
					{{ item }}
				</div>
			</div>
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import showMixin from "../../mixins/git/show";
import trimFilePathMixin from "../../mixins/trimFilePath";
import TFlexbox from "../TLayouts/TFlexbox";

export default {
	name: "CommitHistoryItem",
	components: {
		TFlexbox
	},
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			files: {
				isActive: false,
				list: []
			}
		};
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		}
	},
	methods: {
		showFiles(hash) {
			this.files.isActive = true;
			setTimeout(() => {
				this.getFilesDetail(hash);
			}, 5000);
		},
		hideFiles() {
			this.files.isActive = false;
			this.files.list = [];
		},
		getFilesDetail(hash) {
			const params = [hash, "--oneline", "--stat"];
			showMixin(this.currentRepository, params).then(result => {
				let output = result.split("\n");
				this.files.list = trimFilePathMixin(output.slice(1, output.length - 2));
			});
		}
	}
};
</script>

<style lang="sass">
.history
	&__item
		padding: 10px
		font-size: 12px
		border-bottom: 1px solid #DEE0E3

		&__title
			margin-bottom: 6px
			color: black

		&__author
			font-size: 10px
			color: #6C6F75

			&__image
				width: 15px
				height: 15px
				margin-right: 6px

	&__files
		position: fixed
		left: 200px

		&__dropdown
			background-color: white
			border-radius: 3px
			box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px
			font-size: .8rem
			position: relative
			top: -20px

			&__item
				cursor: pointer
				padding: 8px 15px

				&:hover
					background-color: rgba(139, 151, 152, .1)
</style>
