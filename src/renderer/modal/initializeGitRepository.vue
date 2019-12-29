<template>
	<t-card width="small">
		<t-card-header>
			<t-card-header-heading heading="Git not found" />
		</t-card-header>
		<t-card-body>
			By default git will be initialized at the root of the project.
		</t-card-body>
		<t-card-footer>
			<t-button
				:outline="true"
				border-color="00adb5"
				margin-left="auto"
				@click.native="switchRepository"
			>
				Go back
			</t-button>
			<t-button margin-left=".5rem" @click.native="initializeGit">
				Initialize git
			</t-button>
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
import TButton from "../components/TButton/TButton";

// mixins
import closeModalMixin from "../mixins/closeModal";
import gitInit from "../git/init";

export default {
	name: "InitializeGitRepository",
	components: {
		TCard,
		TCardHeader,
		TCardHeaderHeading,
		TCardBody,
		TCardFooter,
		TButton
	},
	mixins: [closeModalMixin],
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		}
	},
	methods: {
		switchRepository() {
			this.closeModal("InitializeGitRepository");
			this.$store.dispatch("workspace/switchWorkspaceRepository");
			this.$router.push({ name: "welcome" });
		},
		initializeGit() {
			gitInit(this.currentRepository.path);
			this.$store.dispatch({
				type: "repository/updateIsGit",
				isGit: true
			});
			this.closeModal("InitializeGitRepository");
		}
	}
};
</script>
