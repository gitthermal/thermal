<template>
  <a class="history__item d-flex flex-column">
    <div :title="data.message" class="history__item__title">{{ data.message }}</div>
    <div class="history__item__author d-flex flex-row align-items-center">
      <img class="history__item__author__image" src="../../../../static/image/user_avatar.png">
      {{ data.author_name }} committed {{ data.date | moment("from", "now") }}
    </div>
  </a>
</template>

<script>
export default {
	props: {
		data: {
			type: Object
		}
	}
}
</script>

<style lang='sass'>
	.history
	
		&__item
			padding: 10px
			font-size: 12px
			border-bottom: 1px solid #DEE0E3

			&__title
				margin-bottom: 6px
				color: black

			&__author
				font-size: 10px
				color: #6C6F75

				&__image
					width: 15px
					height: 15px
					margin-right: 6px
</style>
