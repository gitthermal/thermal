<template>
  <div id="app">
		<div class="col-view">
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
export default {
	name: "thermal"
}
</script>

<style lang="sass">
	.col-view
		display: flex
		height: 100vh
		flex-direction: row
</style>
