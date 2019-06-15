<template>
	<div class="settings d-flex">
		<settingsSidebar />
		<div class="w-100">
			<t-scrollbar height="95vh">
				<div class="container">
					<div class="settings__content">
						<router-view />
					</div>
				</div>
			</t-scrollbar>
		</div>
	</div>
</template>

<script>
import settingsSidebar from "../../components/sidebar/settings";
import TScrollbar from "../../components/TLayouts/TScrollbar";

export default {
	name: "Settings",
	components: {
		settingsSidebar,
		TScrollbar
	}
};
</script>

<style lang="sass">
.settings
	height: 95vh
	&__content
		margin-top: 2rem
		padding: 20px
</style>
