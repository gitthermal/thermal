<template>
  <div class="settings__sidebar">
    <div class="settings__sidebar__title d-flex align-items-center">
      <h5>Settings</h5>
      <div @click="previousPage()" class="settings__sidebar__title__close d-flex ml-auto">
        <closeIcon/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
	name: "settingsSidebar",
	methods: {
		previousPage() {
			this.$router.push({ name: "welcome" })
		}
	}
}
</script>

<style lang='sass'>
.settings

	&__sidebar
		width: 250px
		background-color: #EFEFEF
		border-right: 1px solid #DEE0E3

		&__title
			margin: 1rem 1.2rem 1.5rem
			font-weight: 600

			h5
				margin-bottom: 0

			&__close
				cursor: pointer

				svg
					width: 20px
					height: 20px
					stroke: #222831
