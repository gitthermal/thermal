<template>
	<div class="experimental">
		<h4>Experimental Features</h4>
		<div class="experimental__warning">
			Experimental features are projects/features that aren't quite ready. They
			may break (or disapper) at any time. Let us know what you think on our
			<a @click="discordURL()">Thermal Discord server</a>.
		</div>
		<div class="settings__section__group">
			<t-flexbox
				flex-direction="row"
				align-items="center"
				class="settings__section__group__item"
			>
				<div>
					<h6>Auto init</h6>
					<p>
						Automatically initalize a non-git repository.
					</p>
				</div>
				<toggle-button
					v-model="toggleAutoInit"
					color="#00adb5"
					class="ml-auto"
				/>
			</t-flexbox>
			<t-flexbox
				flex-direction="row"
				align-items="center"
				class="settings__section__group__item"
			>
				<div>
					<h6>File changes</h6>
					<p>
						Preview additions and deletion in file from commit history,
						<a @click="fileChanges()">click to learn more</a>.
					</p>
				</div>
				<toggle-button
					v-model="toggleFileChanges"
					color="#00adb5"
					class="ml-auto"
				/>
			</t-flexbox>
			<t-flexbox
				flex-direction="row"
				align-items="center"
				class="settings__section__group__item"
			>
				<div>
					<h6>Quick file preview</h6>
					<p>
						Toggle quick file preview for commit logs.
					</p>
				</div>
				<toggle-button
					v-model="toggleQuickFilePreview"
					color="#00adb5"
					class="ml-auto"
				/>
			</t-flexbox>
		</div>
	</div>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";
import TFlexbox from "../../components/TLayouts/TFlexbox";
const { shell } = require("electron");

export default {
	name: "ExperimentalFeatures",
	components: {
		TFlexbox,
		ToggleButton
	},
	computed: {
		toggleAutoInit: {
			get: function() {
				return this.$store.state.settings.experimental.autoInit;
			},
			set: function(value) {
				this.$store.dispatch({
					type: "settings/updateAutoInit",
					autoInit: value
				});
			}
		},
		toggleFileChanges: {
			get: function() {
				return this.$store.state.settings.experimental.fileChanges;
			},
			set: function(value) {
				this.$store.dispatch({
					type: "settings/updateFileChanges",
					fileChanges: value
				});
			}
		},
		toggleQuickFilePreview: {
			get: function() {
				return this.$store.state.settings.experimental.quickFilePreview;
			},
			set: function(value) {
				this.$store.dispatch({
					type: "settings/updateQuickFilePreview",
					quickFilePreview: value
				});
			}
		}
	},
	methods: {
		discordURL() {
			shell.openExternal("https://discord.gg/f5mYum8");
		},
		fileChanges() {
			shell.openExternal(
				"https://www.notion.so/gitthermal/File-changes-ad75574eee7143e398fd6d46b0b91b92#ad75574eee7143e398fd6d46b0b91b92https://www.notion.so/gitthermal/File-changes-ad75574eee7143e398fd6d46b0b91b92#ad75574eee7143e398fd6d46b0b91b92"
			);
		}
	}
};
</script>

<style lang="sass">
.experimental

	&__warning
		padding: 1rem 0
		font-size: 12px
		color: #6C6F75

		a
			border-bottom: 1px solid #00adb5
</style>
