<template>
  <div>
    <navbar />
    <div class="col__view">
      <sidebar />
      <router-view />
    </div>
  </div>
</template>

<script>
import navbar from "../../components/navbar"
import sidebar from "../../components/sidebar"

export default {
	name: "RepositoryIndex",
	components: {
		navbar,
		sidebar
	}
}
</script>

<style lang='sass'>
.col__view
	display: flex
	height: 86vh
	flex-direction: row
</style>
