<template>
	<div class="settings d-flex">
		<settingsSidebar />
		<div class="w-100">
			<t-scrollbar height="95vh">
				<t-container>
					<div class="settings__content">
						<router-view />
					</div>
				</t-container>
			</t-scrollbar>
		</div>
	</div>
</template>

<script>
import settingsSidebar from "../../components/sidebar/settings";
import TScrollbar from "../../components/TLayouts/TScrollbar";
import TContainer from "../../components/TLayouts/TContainer";

export default {
	name: "Settings",
	components: {
		settingsSidebar,
		TScrollbar,
		TContainer
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
