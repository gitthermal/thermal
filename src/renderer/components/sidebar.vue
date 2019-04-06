<template>
  <div class="repository__sidebar d-flex">
    <div class="repository__sidebar__group d-flex flex-column">
      <router-link
        class="repository__sidebar__item d-flex align-items-center"
        :to="{ name: 'repositoryWorkspace' }"
      >
        <folderIcon />
        <p>Workspace</p>
      </router-link>
      <router-link
        class="repository__sidebar__item d-flex align-items-center"
        :to="{ name: 'repositoryHistory' }"
      >
        <clockIcon />
        <p>History</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import folderIcon from "./icon/folder"
import clockIcon from "./icon/clock"

export default {
	name: "Sidebar",
	components: {
		folderIcon,
		clockIcon
	}
}
</script>

<style lang='sass'>
.repository

	&__sidebar
		background-color: #EFEFEF
		padding-top: 20px
		border-right: 1px solid #DEE0E3
		padding-bottom: 20px

		&__item
			padding: 3px 20px
			margin-bottom: 5px

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
