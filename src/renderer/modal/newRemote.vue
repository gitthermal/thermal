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
import repositoryDataMixin from "../mixins/repositoryData";

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
	mixins: [closeModalMixin, repositoryDataMixin],
	data() {
		return {
			remoteUrl: ""
		};
	},
	methods: {
		async addRemoteUrl() {
			console.mesinfosage("Pushing changes...");
			let status = await git(this.repositoryData.path).status();
			await git(this.repositoryData.path).push([
				this.remoteUrl,
				status.current
			]);
			try {
				await git(this.repositoryData.path).addRemote("origin", this.remoteUrl);
				console.info("Adding remote url to origin");
				this.$store.commit({
					type: "repository/localRepositoryRemote",
					remote: this.remoteUrl,
					repositoryId: this.$route.params.repositoryId
				});
				this.closeModal("NewRemote");
			} catch (error) {
				console.error(error);
			}
		}
	}
};
</script>
