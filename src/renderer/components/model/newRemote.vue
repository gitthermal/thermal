<template>
	<div v-show="this.$store.state.model.model.newRemote" class="model--small">
		<div class="model__section model__header">
      <h6 class="model__header__title">Add remote url</h6>
      <div @click="closeModel()" class="model__header__close">
        <closeIcon/>
      </div>
    </div>
    <div class="model__section model__body flex-column">
			<inputText
				v-model="remoteUrl"
				name="remoteUrl"
				placeholder="Remote URL"
				@keyup.esc.native="closeModel"
				@keyup.enter.native="addRemoteUrl"
				v-focus
			/>
    </div>
    <div class="model__section model__footer">
      <primaryButton class="ml-auto" text="Publish repository"/>
    </div>
	</div>
</template>

<script>
import inputText from '../inputText'
import closeIcon from '../icon/close'
import primaryButton from '../atoms/primaryButton'
export default {
	name: "newRemote",
	components: {
		inputText,
		closeIcon,
		primaryButton
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"]
		}
	},
	methods: {
		closeModel() {
			this.$store.dispatch("model/showNewRemote")
		}
	},
	directives: {
		focus: {
			inserted: function (el) {
				el.focus()
			}
		}
	}
}
</script>

<style lang='sass'>

</style>
