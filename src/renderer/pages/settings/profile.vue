<template>
	<div class="profile">
		<div class="avatar">
			<Avatar
				:src="profileData.author.imageUrl"
				:title="profileData.author.name"
				:border-radius="1"
				:border-width="1"
				border-style="solid"
				border-color="eeeeee"
				width="160px"
				height="160px"
			/>
		</div>
		<inputTextLabel
			v-model="authorName"
			label="Name"
			placeholder="Enter your name"
			name="profile_name"
			class="field"
		/>
		<inputTextLabel
			v-model="authorEmail"
			label="Email"
			placeholder="Enter your email address"
			name="profile_email"
			class="field"
		/>
		<inputTextLabel
			v-model="authorImage"
			label="Image"
			placeholder="Paste your image"
			name="profile_image"
			class="field"
		/>
	</div>
</template>

<script>
import Avatar from "../../components/avatar/Avatar";
import inputTextLabel from "../../components/input/inputTextLabel";

export default {
	name: "Profile",
	components: {
		Avatar,
		inputTextLabel
	},
	computed: {
		profileData() {
			return this.$store.getters["settings/getProfile"];
		},
		authorName: {
			get: function() {
				return this.profileData.author.name;
			},
			set: function(value) {
				this.$store.dispatch({
					type: "settings/updateAuthorName",
					name: value
				});
			}
		},
		authorEmail: {
			get: function() {
				return this.profileData.author.email;
			},
			set: function(value) {
				this.$store.dispatch({
					type: "settings/updateAuthorEmail",
					email: value
				});
			}
		},
		authorImage: {
			get: function() {
				return this.profileData.author.imageUrl;
			},
			set: function(value) {
				this.$store.dispatch({
					type: "settings/updateAuthorImage",
					image: value
				});
			}
		}
	}
};
</script>

<style lang="sass">
.profile
	.avatar
		border-radius: 1rem
		display: inline-block
		margin-bottom: 1rem

	.field
		margin-bottom: 1rem
</style>
