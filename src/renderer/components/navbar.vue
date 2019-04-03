<template>
  <div v-if="!!currentRepository" class="navbar">
    <div v-show="getFeatureValue.commit" @click="openCommitPage()" class="navbar__item">
      <commitIcon/>
      <p>Commit</p>
    </div>
    <div v-show="getFeatureValue.remote" v-if="!!getRemoteUrl" class="navbar__group">
      <div @click="gitPull()" class="navbar__item">
        <pullIcon/>
        <p>Pull</p>
      </div>
      <div @click="gitPush()" class="navbar__item">
        <pushIcon/>
        <p>Push</p>
      </div>
      <div class="navbar__item">
        <fetchIcon/>
        <p>Fetch</p>
      </div>
		</div>
		<div @click="newRemote()" v-else v-show="getFeatureValue.remote" :class="!!getRemoteUrl === false ? 'navbar__group' : ''" class="navbar__item">
      <publishIcon/>
      <p>Publish</p>
    </div>
    <div class="navbar__group ml-auto">
      <div class="navbar__item">
        <terminalIcon/>
        <p>Terminal</p>
      </div>
      <div @click="openFileExplorer()" class="navbar__item">
        <folderIcon/>
        <p>Explorer</p>
      </div>
      <div @click="openRepositorySettings()" class="navbar__item">
        <settingsIcon/>
        <p>Settings</p>
      </div>
    </div>
    <div @click="switchRepository()" class="navbar__item">
      <switchRepositoryIcon/>
      <p>Switch repo</p>
    </div>
  </div>
</template>

<script>
import git from "simple-git/promise"
import commitIcon from "./icon/commit"
import pushIcon from "./icon/push"
import pullIcon from "./icon/pull"
import fetchIcon from "./icon/fetch"
import publishIcon from "./icon/publish"
import terminalIcon from "./icon/terminal"
import folderIcon from "./icon/folder"
import settingsIcon from "./icon/settings"
import switchRepositoryIcon from "./icon/switch"
const { shell } = require("electron")

export default {
	name: "navbar",
	components: {
		commitIcon,
		pushIcon,
		pullIcon,
		fetchIcon,
		publishIcon,
		terminalIcon,
		folderIcon,
		settingsIcon,
		switchRepositoryIcon
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"]
		},
		getRemoteUrl() {
			return this.currentRepository.remote
		},
		getFeatureValue() {
			return this.currentRepository.features
		}
	},
	methods: {
		openCommitPage() {
			this.$router.push({ name: "repositoryWorkspace" })
		},
		async gitPull() {
			let pull = await git(this.currentRepository.path).pull()
			try {
				console.log(pull)
			} catch (error) {
				console.log(error)
			}
		},
		async gitPush() {
			let activeBranch = this.$store.state.commit.activeBranch
			await git(this.currentRepository.path).push([this.currentRepository.remote, activeBranch])
			try {
				console.log("Push changes to remote repository")
			} catch (error) {
				console.log(error)
			}
		},
		newRemote() {
			this.$store.dispatch("model/showNewRemote")
		},
		openFileExplorer() {
			shell.openItem(this.currentRepository.path)
		},
		openRepositorySettings() {
			this.$router.push({ name: "repositorySettings" })
		},
		switchRepository() {
			this.$store.dispatch("workspace/switchWorkspaceRepository")
			this.$router.push({ name: "welcome" })
		}
	}
}
</script>

<style lang='sass'>
	.navbar
		background-color: #EFEFEF
		border-bottom: 1px solid #DEE0E3
		padding: 12px 20px
		z-index: 8
		position: relative

		&__item
			flex-direction: column
			align-items: center
			user-select: none

			&:hover
				cursor: pointer

			svg
				width: 20px
				height: 20px
				stroke: #A1A5AC
				margin-bottom: 5px

			p
				color: #7A7D84
				font-size: 12px
		
		&__group
			padding-left: 30px
			padding-right: 30px

			.navbar__item
				&:not(:last-child)
					margin-right: 15px

	.navbar, .navbar__item, .navbar__group
		display: flex
</style>
