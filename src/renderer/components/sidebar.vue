<template>
  <div class="sidebar">
    <div class="sidebar--group">
      <router-link class="sidebar--item" to="workspace">
        <folderIcon/>
        <p>Workspace</p>
      </router-link>
      <router-link class="sidebar--item" to="history">
        <historyIcon/>
        <p>History</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import folderIcon from "./icon/folder"
import historyIcon from "./icon/history"
export default {
	components: {
		folderIcon,
		historyIcon
	}
}
</script>

<style lang='sass'>
	.sidebar
		background-color: #EFEFEF
		padding-top: 20px
		border-right: 1px solid #DEE0E3
		padding-bottom: 20px

	.sidebar--group, .sidebar--item
		display: flex

	.sidebar--group
		flex-direction: column

	.sidebar--item
		padding: 3px 20px
		margin-bottom: 5px
		align-items: center

		svg
			width: 20px
			height: 20px
			stroke: #6C6F75
			margin-right: 10px

		p
			color: #6C6F76
			font-size: 14px

	.router-link-active
		background-color: #DEE0E3
</style>
