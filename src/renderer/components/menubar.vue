<template>
  <div class="menubar d-flex">
    <div class="menubar__logo d-flex">
      <thermalLogo/>
    </div>
    <div class="menubar__list d-flex align-items-center">
      <div @click="fileDropdown()">
        <div class="menubar__list__item">File</div>
        <div @mouseleave="fileDropdown()" v-show="this.menu.file.isActive" class="menubar__list__item__dropdown">
					<div class="menubar__list__item__dropdown__item">New repository</div>
          <div @click="addLocalRepository()" class="menubar__list__item__dropdown__item">Add local repository</div>
          <div class="menubar__list__item__dropdown__item">Clone repository</div>
          <div class="menubar__list__item__dropdown__item">Options</div>
          <div @click="exitApp()" class="menubar__list__item__dropdown__item">Exit</div>
        </div>
      </div>
      <div @click="viewDropdown()">
        <div class="menubar__list__item">View</div>
        <div
					@mouseleave="viewDropdown()"
          v-show="this.menu.view.isActive"
          class="menubar__list__item__dropdown"
        >
          <div class="menubar__list__item__dropdown__item">Changes</div>
					<div class="menubar__list__item__dropdown__item">History</div>
					<div class="menubar__list__item__dropdown__item">Repository list</div>
					<div class="menubar__list__item__dropdown__item">Branches list</div>
					<div class="menubar__list__item__dropdown__item">Go to summary</div>
					<div class="menubar__list__item__dropdown__item">Toggle full screen</div>
					<div class="menubar__list__item__dropdown__item">Reset zoom</div>
					<div class="menubar__list__item__dropdown__item">Zoom in</div>
					<div class="menubar__list__item__dropdown__item">Zoom out</div>
					<div class="menubar__list__item__dropdown__item">Toggle developer tools</div>
        </div>
      </div>
      <div @click="repositoryDropdown()">
        <div class="menubar__list__item">Repository</div>
        <div
					@mouseleave="repositoryDropdown()"
          v-show="this.menu.repository.isActive"
          class="menubar__list__item__dropdown"
        >
					<div class="menubar__list__item__dropdown__item">Push</div>
					<div class="menubar__list__item__dropdown__item">Pull</div>
					<div class="menubar__list__item__dropdown__item">Remove</div>
					<div class="menubar__list__item__dropdown__item">View on GitHub</div>
					<div class="menubar__list__item__dropdown__item">Open in PowerShell</div>
					<div class="menubar__list__item__dropdown__item">Show in Explorer</div>
					<div class="menubar__list__item__dropdown__item">Open in Code editor</div>
					<div class="menubar__list__item__dropdown__item">Repository settings</div>
        </div>
      </div>
      <div @click="branchDropdown()">
        <div class="menubar__list__item">Branch</div>
        <div
					@mouseleave="branchDropdown()"
          v-show="this.menu.branch.isActive"
          class="menubar__list__item__dropdown"
        >
					<div class="menubar__list__item__dropdown__item">New branch</div>
					<div class="menubar__list__item__dropdown__item">Rename branch</div>
					<div class="menubar__list__item__dropdown__item">Delete branch</div>
					<div class="menubar__list__item__dropdown__item">Update to master</div>
					<div class="menubar__list__item__dropdown__item">Compare to master</div>
					<div class="menubar__list__item__dropdown__item">Merge into current branch</div>
					<div class="menubar__list__item__dropdown__item">Compare on GitHub</div>
					<div class="menubar__list__item__dropdown__item">Create pull request</div>
        </div>
      </div>
      <div @click="helpDropdown()">
        <div class="menubar__list__item">Help</div>
        <div
					@mouseleave="helpDropdown()"
          v-show="this.menu.help.isActive"
          class="menubar__list__item__dropdown"
        >
					<div class="menubar__list__item__dropdown__item">Welcome</div>
					<div class="menubar__list__item__dropdown__item">Report issue</div>
					<div class="menubar__list__item__dropdown__item">Contact support</div>
					<div class="menubar__list__item__dropdown__item">Show User Guides</div>
					<div class="menubar__list__item__dropdown__item">Show logs in Explorer</div>
					<div @click="about()" class="menubar__list__item__dropdown__item">About</div>
        </div>
      </div>
    </div>
    <div class="menubar__drag"></div>
    <div class="menubar__controles">
      <windowsButton/>
    </div>
  </div>
</template>

<script>
import thermalLogo from "./icon/logo"
import windowsButton from "./windowsButton"
const { remote } = require("electron")

export default {
	name: "menubar",
	data() {
		return {
			menu: {
				file: {
					name: "File",
					isActive: false
				},
				view: {
					name: "View",
					isActive: false
				},
				repository: {
					name: "Repository",
					isActive: false
				},
				branch: {
					name: "Branch",
					isActive: false
				},
				help: {
					name: "Help",
					isActive: false
				}
			}
		}
	},
	components: {
		thermalLogo,
		windowsButton
	},
	methods: {
		fileDropdown() {
			this.menu.file.isActive = !this.menu.file.isActive
		},
		viewDropdown() {
			this.menu.view.isActive = !this.menu.view.isActive
		},
		repositoryDropdown() {
			this.menu.repository.isActive = !this.menu.repository.isActive
		},
		branchDropdown() {
			this.menu.branch.isActive = !this.menu.branch.isActive
		},
		helpDropdown() {
			this.menu.help.isActive = !this.menu.help.isActive
		},
		addLocalRepository() {
			this.$store.dispatch("model/showModelPlaceholder")
			this.$store.dispatch("workspace/showAddLocalRepositoryModel")
		},
		exitApp() {
			remote.getCurrentWindow().close()
		},
		about() {
			this.$store.dispatch("model/showModelPlaceholder")
			this.$store.dispatch("workspace/showAboutModel")
		}
	}
}
</script>

<style lang='sass'>
.menubar
	width: 100%
	width: 100%

	&__drag
		width: 100%
		-webkit-app-region: drag

	&__logo
		padding: 8px 10px
		svg
			width: 20px
			height: 20px

	&__list
		padding: 8px 10px

		&__item
			color: #8B9798
			cursor: pointer
			font-size: .8rem
			
			&:not(:last-child)
				margin-right: 1rem

			&:hover
				color: #222831

			&__dropdown
				top: 32px
				position: absolute
				background-color: white
				border-radius: 3px
				box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px
				display: flex
				font-size: .8rem
				flex-direction: column
				z-index: 30
				
				&__item
					cursor: pointer
					padding: 8px 15px

					&:hover
						background-color: rgba(139, 151, 152, .1)

	&__controles
		margin-left: auto
</style>
