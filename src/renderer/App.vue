<template>
  <div id="app">
    <navbar/>
    <div class="col-view">
      <sidebar/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from "./components/navbar"
import sidebar from "./components/sidebar"
export default {
	name: "thermal",
	components: {
		navbar,
		sidebar,
	}
}
</script>

<style lang="sass">
	.col-view
		display: flex
		height: 100vh
		flex-direction: row
</style>
