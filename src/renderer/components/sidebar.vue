<template>
	<t-flexbox class="repository__sidebar">
		<t-flexbox flex-direction="column" class="repository__sidebar__group">
			<router-link class="repository__sidebar__item" :to="{ name: 'repositoryWorkspace' }">
				<t-flexbox align-items="center">
					<folderIcon />
					<p>Workspace</p>
				</t-flexbox>
			</router-link>
			<router-link class="repository__sidebar__item" :to="{ name: 'repositoryHistory' }">
				<t-flexbox align-items="center">
					<clockIcon />
					<p>History</p>
				</t-flexbox>
			</router-link>
			<router-link class="repository__sidebar__item" :to="{ name: 'repositoryStats' }">
				<t-flexbox align-items="center">
					<barIcon />
					<p>Stats</p>
				</t-flexbox>
			</router-link>
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import TFlexbox from "./TLayouts/TFlexbox";
import folderIcon from "./icon/folder";
import clockIcon from "./icon/clock";
import barIcon from "./icon/bar";

export default {
	name: "Sidebar",
	components: {
		TFlexbox,
		folderIcon,
		clockIcon,
		barIcon
	}
};
</script>

<style lang="sass">
.repository
	&__sidebar
		background-color: #EFEFEF
		padding-top: 20px
		border-right: 1px solid #DEE0E3
		padding-bottom: 20px

		&__item
			padding: 3px 20px
			margin-bottom: 1.5rem

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
