<template>
  <div class="settings d-flex">
    <settingsSidebar/>
  </div>
</template>

<script>
import settingsSidebar from "../../components/sidebar/settings"

export default {
	name: "settings",
	components: {
		settingsSidebar,
	}
}
</script>

<style lang='sass'>
.settings
	height: 95vh
</style>
