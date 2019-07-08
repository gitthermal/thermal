<template>
	<t-card width="small">
		<t-card-header>
			<t-card-header-heading heading="Export commit data" />
			<t-card-header-close modal-name="ExportCommitData" />
		</t-card-header>
		<t-card-body>
			<inputTextLabel
				v-model="exportFileName"
				name="fileName"
				label="Name"
				placeholder="File name"
				class="model__body__input"
				margin-right=".8rem"
				style="flex-grow: 1"
			/>
			<inputTextLabel
				v-model="exportFilePath"
				name="filePath"
				label="Path"
				placeholder="File path"
				class="model__body__input"
			/>
		</t-card-body>
		<t-card-footer>
			<t-button
				:outline="true"
				margin-left="auto"
				@click.native="closeModal('ExportCommitData')"
			>
				Close
			</t-button>
			<t-button margin-left=".5rem" @click.native="exportDetail()">
				Export
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
import TButton from "../components/TButton/TButton";
import inputTextLabel from "../components/input/inputTextLabel";

// mixins
import closeModalMixin from "../mixins/closeModal";

const fs = require("fs");

export default {
	name: "ExportCommitData",
	components: {
		TCard,
		TCardHeader,
		TCardHeaderHeading,
		TCardHeaderClose,
		TCardBody,
		TCardFooter,
		inputTextLabel,
		TButton
	},
	mixins: [closeModalMixin],
	data() {
		return {
			exportFileName: "",
			exportFilePath: ""
		};
	},
	computed: {
		commitInformation() {
			return this.$store.getters["history/getCommitInformation"];
		}
	},
	methods: {
		exportDetail() {
			let commitData = JSON.stringify(this.commitInformation);
			fs.writeFileSync(
				this.exportFilePath + this.exportFileName + ".json",
				commitData
			);
			this.closeModal("ExportCommitData");
		}
	}
};
</script>
