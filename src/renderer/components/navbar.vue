<template>
  <div class="navbar">
    <div class="navbar--item">
      <commitIcon/>
      <p>Commit</p>
    </div>
    <div class="navbar--group">
      <div class="navbar--item">
        <pullIcon/>
        <p>Pull</p>
      </div>
      <div class="navbar--item">
        <pushIcon/>
        <p>Push</p>
      </div>
      <div class="navbar--item">
				<fetchIcon/>
        <p>Fetch</p>
      </div>
    </div>
    <div class="navbar--group navbar--repo-meta">
      <div class="navbar--item">
        <terminalIcon/>
        <p>Terminal</p>
      </div>
      <div class="navbar--item">
        <folderIcon/>
        <p>Explorer</p>
      </div>
      <div class="navbar--item">
        <settingsIcon/>
        <p>Settings</p>
      </div>
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

export default {
	components: {
		commitIcon,
		pushIcon,
		pullIcon,
		fetchIcon,
		terminalIcon,
		folderIcon,
		settingsIcon
	}
}
</script>

<style lang='sass'>
	.navbar
		background-color: #EFEFEF
		border-top: 1px solid #DEE0E3
		border-bottom: 1px solid #DEE0E3
		padding: 12px 20px
		
	.navbar, .navbar--item, .navbar--group
		display: flex

	.navbar--group
		padding-left: 30px
		padding-right: 30px

		.navbar--item
			&:not(:last-child)
				margin-right: 15px
	
	.navbar--item
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

	.navbar--repo-meta
		margin-left: auto
</style>
