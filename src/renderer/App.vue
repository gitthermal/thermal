<template>
	<div id="app">
		<menubar />
		<router-view style="height: 100%" />
		<t-modal v-if="activeModal">
			<components :is="modal"></components>
		</t-modal>
		<div v-if="activeModal" class="t-overlay"></div>
	</div>
</template>

<script>
// components
import menubar from "./components/menubar";
import TModal from "./components/TModal/TModal";

// modals
import newRepository from "./modal/newRepository";
import addLocalRepository from "./modal/addLocalRepository";
import about from "./modal/about";
import exportCommitData from "./modal/exportCommitData";
import newRemote from "./modal/newRemote";
import initalizeGitRepository from "./modal/initalizeGitRepository";
import cloneRepository from "./modal/cloneRepository";

export default {
	name: "App",
	components: {
		menubar,
		TModal,
		newRepository,
		addLocalRepository,
		about,
		exportCommitData,
		newRemote,
		initalizeGitRepository,
		cloneRepository
	},
	computed: {
		modal() {
			let modalsActiveStatus = Object.values(this.$store.state.modal);
			let ModalNames = Object.keys(this.$store.state.modal);
			let activeModal = modalsActiveStatus.findIndex(result => {
				return result === true;
			});
			if (ModalNames[activeModal] !== "") {
				return ModalNames[activeModal];
			} else {
				return "";
			}
		},
		activeModal() {
			if (this.modal === undefined) {
				return false;
			} else {
				return true;
			}
		}
	},
	beforeCreate() {
		this.$store.commit("repository/getRepositoryList");
		this.$store.commit("settings/getSettingsList");
	}
};
</script>

<style lang="sass">
html, body, #app
	width: 100%
	height: 100%

.t-overlay
	position: fixed
	top: 0
	bottom: 0
	left: 0
	right: 0
	background-color: rgba(0, 0, 0, .4)
	z-index: 4
</style>
