<template>
  <div class="navbar">
    <div class="navbar__item">
      <commitIcon/>
      <p>Commit</p>
    </div>
    <div class="navbar__group">
      <div class="navbar__item">
        <pullIcon/>
        <p>Pull</p>
      </div>
      <div class="navbar__item">
        <pushIcon/>
        <p>Push</p>
      </div>
      <div class="navbar__item">
				<fetchIcon/>
        <p>Fetch</p>
      </div>
    </div>
    <div class="navbar__group ml-auto">
      <div class="navbar__item">
        <terminalIcon/>
        <p>Terminal</p>
      </div>
      <div class="navbar__item">
        <folderIcon/>
        <p>Explorer</p>
      </div>
      <div class="navbar__item">
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
import commitIcon from "./icon/commit"
import pushIcon from "./icon/push"
import pullIcon from "./icon/pull"
import fetchIcon from "./icon/fetch"
import terminalIcon from "./icon/terminal"
import folderIcon from "./icon/folder"
import settingsIcon from "./icon/settings"
import switchRepositoryIcon from "./icon/switch"

export default {
	name: "navbar",
	components: {
		commitIcon,
		pushIcon,
		pullIcon,
		fetchIcon,
		terminalIcon,
		folderIcon,
		settingsIcon,
		switchRepositoryIcon
	},
	methods: {
		switchRepository() {
			this.$store.dispatch("workspace/switchWorkspaceRepository")
		}
	}
}
</script>

<style lang='sass'>
	.navbar
		background-color: #EFEFEF
		border-top: 1px solid #DEE0E3
		border-bottom: 1px solid #DEE0E3
		padding: 12px 20px

		&__item
			flex-direction: column
			align-items: center

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
