<template>
	<t-card width="small">
		<t-card-header>
			<t-card-header-heading heading="Git not found" />
		</t-card-header>
		<t-card-body>
			By default git will be initalized at the root of the project.
		</t-card-body>
		<t-card-footer>
			<Button
				text="Go back"
				appearance="outline"
				border-color="00adb5"
				margin-left="auto"
				@click.native="switchRepository"
			/>
			<Button
				text="Initalize git"
				appearance="primary"
				margin-left=".5rem"
				@click.native="initalizeGit"
			/>
		</t-card-footer>
	</t-card>
</template>

<script>
// components
import TCard from "../components/TCard/TCard";
import TCardHeader from "../components/TCard/TCardHeader";
import TCardHeaderHeading from "../components/TCard/TCardHeaderHeading";
import TCardBody from "../components/TCard/TCardBody";
import TCardFooter from "../components/TCard/TCardFooter";
import Button from "../components/buttons/Button";

// mixins
import closeModalMixin from "../mixins/closeModal";
import gitInit from "../git/init";

export default {
	name: "InitalizeGitRepository",
	components: {
		TCard,
		TCardHeader,
		TCardHeaderHeading,
		TCardBody,
		TCardFooter,
		Button
	},
	mixins: [closeModalMixin],
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		}
	},
	methods: {
		switchRepository() {
			this.closeModal("InitalizeGitRepository");
			this.$store.dispatch("workspace/switchWorkspaceRepository");
			this.$router.push({ name: "welcome" });
		},
		initalizeGit() {
			gitInit(this.currentRepository.path);
			this.$store.dispatch({
				type: "repository/updateIsGit",
				isGit: true
			});
			this.closeModal("InitalizeGitRepository");
		}
	}
};
</script>
