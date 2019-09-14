<template>
	<t-card width="small">
		<t-card-header>
			<t-card-header-heading heading="Add local repository" />
			<t-card-header-close modal-name="AddLocalRepository" />
		</t-card-header>
		<t-card-body>
			<inputText
				v-model.trim="newRepository.path"
				v-focus
				name="pathToRepository"
				placeholder="Local path to repository"
				@keyup.esc.native="closeModal('AddLocalRepository')"
				@keyup.enter.native="addRepository"
			/>
			<input
				ref="fileInput"
				type="file"
				name="folderSelector"
				webkitdirectory
				style="display: none"
				@change="fileSectorInput"
			/>
			<t-button margin-left=".4rem" @click.native="$refs.fileInput.click()">
				Select
			</t-button>
		</t-card-body>
		<t-card-footer>
			<t-button
				outline="true"
				margin-left="auto"
				@click.native="closeModal('AddLocalRepository')"
			>
				Close
			</t-button>
			<t-button
				margin-left=".5rem"
				@click.native="addRepository(newRepository.path)"
			>
				Add repository
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
import addRepository from "../mixins/addRepository";

export default {
	name: "AddLocalRepository",
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
	mixins: [closeModalMixin, addRepository],
	methods: {
		fileSectorInput(event) {
			this.newRepository.path = event.target.files[0].path.split("\\").join("/");
		},
		addRepository(path) {
			if (this.newRepository.path !== "") {
				this.addRepositoryToDatabase(path);
				this.closeModal("AddLocalRepository");
			}
		}
	}
};
</script>
