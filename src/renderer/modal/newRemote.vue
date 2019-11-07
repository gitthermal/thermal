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
			<t-button
				margin-left=".5rem"
				:disabled="!remoteUrl"
				@click.native="addRemoteUrl"
			>
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
import repositoryData from "../mixins/repositoryData";
import { addRemoteUrl } from "../git/remote";
import database from "../../database";

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
	mixins: [repositoryData, closeModalMixin],
	data() {
		return {
			remoteUrl: ""
		};
	},
	methods: {
		async addRemoteUrl() {
			if (this.remoteUrl) {
				try {
					await addRemoteUrl(
						this.repositoryData.directoryPath,
						"origin",
						this.remoteUrl
					);
					this.addRemoteToDatabase();
					this.closeModal("NewRemote");
				} catch (error) {
					console.error(error);
				}
			}
		},
		addRemoteToDatabase() {
			database.run(
				`UPDATE gitRepository SET
					remoteUrl = $remoteUrl
				WHERE repositoryId = $repositoryId`,
				{
					$repositoryId: this.repositoryData.repositoryId,
					$remoteUrl: this.remoteUrl
				},
				(err, data) => {
					if (err) console.log(err);
				}
			);
		}
	}
};
</script>
