<template>
    <h1>Welcome to Thermal</h1>
  <div class="welcome">
    <p class="welcome--description">One stop for all of your Git repository.</p>
    <div class="welcome--icon">
      <div class="welcome--item-icon">
        <linkIcon/>
      </div>
      <div class="welcome--item-icon">
        <twitterIcon/>
      </div>
      <div class="welcome--item-icon">
        <coffeeIcon/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang='sass'>
	.welcome
		width: 100%
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center

	.welcome--description
		margin-bottom: 1rem

	.welcome--icon
		display: flex

	.welcome--item-icon
		cursor: pointer
		
		svg
			width: 30px
			height: 30px
			stroke: #222831

		&:not(:last-child)
			margin-right: 20px
</style>
