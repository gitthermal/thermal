<template>
	<t-card width="small">
		<t-card-header>
			<t-card-header-heading heading="Add remote url" />
			<t-card-header-close modal-name="NewRemote" />
		</t-card-header>
		<t-card-body>
			<inputText
				v-model="remoteUrl"
				v-focus
				name="remoteUrl"
				placeholder="Remote URL"
				@keyup.esc.native="closeModal('NewRemote')"
				@keyup.enter.native="addRemoteUrl"
			/>
		</t-card-body>
		<t-card-footer>
			<t-button
				:outline="true"
				margin-left="auto"
				@click.native="closeModal('NewRemote')"
			>
				Close
			</t-button>
			<t-button margin-left=".5rem" @click.native="addRemoteUrl">
				Publish repository
			</t-button>
		</t-card-footer>
	</t-card>
</template>

<script>
// components
import TCard from "../components/TCard/TCard";
import TCardHeader from "../components/TCard/TCardHeader";
import TCardHeaderHeading from "../components/TCard/TCardHeaderHeading";
import TCardHeaderClose from "../components/TCard/TCardHeaderClose";
import TCardBody from "../components/TCard/TCardBody";
import TCardFooter from "../components/TCard/TCardFooter";
import inputText from "../components/input/inputText";
import TButton from "../components/TButton/TButton";

// mixins
import closeModalMixin from "../mixins/closeModal";

import git from "simple-git/promise";

export default {
	name: "NewRemote",
	components: {
		TCard,
		TCardHeader,
		TCardHeaderHeading,
		TCardHeaderClose,
		TCardBody,
		TCardFooter,
		inputText,
		TButton
	},
	directives: {
		focus: {
			inserted: function(el) {
				el.focus();
			}
		}
	},
	mixins: [closeModalMixin],
	data() {
		return {
			remoteUrl: ""
		};
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		}
	},
	methods: {
		async addRemoteUrl() {
			let status = await git(this.currentRepository.path).status();
			console.mesinfosage("Pushing changes...");
			await git(this.currentRepository.path).push([
				this.remoteUrl,
				status.current
			]);
			try {
				await git(this.currentRepository.path).addRemote(
					"origin",
					this.remoteUrl
				);
				console.info("Adding remote url to origin");
				this.$store.commit({
					type: "repository/localRepositoryRemote",
					remote: this.remoteUrl
				});
				this.closeModal("NewRemote");
			} catch (error) {
				console.error(error);
			}
		}
	}
};
</script>
