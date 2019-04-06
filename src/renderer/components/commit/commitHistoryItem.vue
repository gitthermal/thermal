<template>
  <div>
    <a
      class="history__item d-flex flex-column"
      @mouseenter="showFiles(data.hash)"
      @mouseleave="hideFiles()"
    >
      <div
        :title="data.message"
        class="history__item__title"
      >{{ data.message }}</div>
      <div class="history__item__author d-flex flex-row align-items-center">
        <img
          class="history__item__author__image"
          src="../../../../static/image/user_avatar.png"
        >
        {{ data.author_name }} committed {{ data.date | moment("from", "now") }}
      </div>
    </a>
    <div
      v-show="this.files.isActive"
      class="history__files"
    >
      <div class="history__files__dropdown">
        <div
          v-for="item in this.files.list"
          :key="item"
          class="history__files__dropdown__item"
        >
          {{ item.replace(/\|.*/, "").trim() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import git from "simple-git/promise"
import * as Sentry from "@sentry/electron"

export default {
	name: "CommitHistoryItem",
	props: {
		data: {
			type: Object
		}
	},
	data() {
		return {
			files: {
				isActive: false,
				list: []
			}
		}
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"]
		}
	},
	methods: {
		showFiles(hash) {
			this.files.isActive = true
			setTimeout(() => {
				this.getFilesDetail(hash)
			}, 5000)
		},
		hideFiles() {
			this.files.isActive = false
			this.files.list = []
		},
		async getFilesDetail(hash) {
			let files = await git(this.currentRepository.path).show([
				hash,
				"--oneline",
				"--stat"
			])
			try {
				let output = files.split("\n")
				let additionDeletion = output[output.length - 2].split(", ")
				additionDeletion.shift()
				let addition
				let deletion

				for (let i = 0; i < additionDeletion.length; i++) {
					let commitMetaType = additionDeletion[i].slice(
						additionDeletion[i].length - 2,
						additionDeletion[i].length - 1
					)
					let additionDeletionNumber = additionDeletion[i].split(" ")
					if (commitMetaType === "+") {
						addition = additionDeletionNumber[0]
					}
					if (commitMetaType === "-") {
						deletion = additionDeletionNumber[0]
					}
				}

				this.files.list = output.slice(1, output.length - 2)
			} catch (error) {
				Sentry.captureException(error)
				let errorMessage = "Unable to fetch commit files."
				console.log(errorMessage)
				Sentry.captureMessage(errorMessage, files)
			}
		}
	}
}
</script>

<style lang='sass'>
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
				display: flex
				font-size: .8rem
				flex-direction: column
				position: relative
				top: -20px
			
				&__item
					cursor: pointer
					padding: 8px 15px

					&:hover
						background-color: rgba(139, 151, 152, .1)				
</style>
