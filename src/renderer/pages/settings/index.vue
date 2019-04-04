<template>
  <div class="settings d-flex">
    <settingsSidebar/>
		<div class="w-100">
			<VueScrollbar class="settings__scrollbar">
				<div class="container">
					<div class="settings__content">
						<router-view></router-view>
					</div>
				</div>
			</VueScrollbar>
		</div>
  </div>
</template>

<script>
import settingsSidebar from "../../components/sidebar/settings"
import VueScrollbar from "vue2-scrollbar"

export default {
	name: "settings",
	components: {
		settingsSidebar,
		VueScrollbar
	}
}
</script>

<style lang='sass'>
.settings
	height: 95vh

	&__scrollbar
		max-height: 95vh

	&__content
		margin-top: 2rem
		padding: 20px
</style>
