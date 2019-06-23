<template>
	<div>
		<a
			class="history__item d-flex flex-column"
			@mouseenter="showFiles(data.hash)"
			@mouseleave="hideFiles()"
		>
			<div :title="data.message" class="history__item__title">
				{{ data.message }}
			</div>
			<div class="history__item__author d-flex flex-row align-items-center">
				<img
					class="history__item__author__image"
					src="../../../../static/image/user_avatar.png"
				/>
				{{ data.author_name }} committed {{ data.date | moment("from", "now") }}
			</div>
		</a>
		<div v-show="files.isActive" class="history__files">
			<dropdown-list class="history__files__dropdown">
				<dropdown-item v-for="item in files.list" :key="item">
					{{ item }}
				</dropdown-item>
			</dropdown-list>
		</div>
	</div>
</template>

<script>
import showMixin from "../../git/show";
import trimFilePathMixin from "../../mixins/trimFilePath";
import DropdownList from "../dropdown/dropdownList";
import DropdownItem from "../dropdown/dropdownItem";

export default {
	name: "CommitHistoryItem",
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
	components: {
		DropdownList,
		DropdownItem
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
			position: relative
			top: -20px
</style>
