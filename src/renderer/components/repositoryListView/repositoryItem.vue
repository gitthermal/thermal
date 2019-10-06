<template>
	<t-flexbox align-items="center" class="welcome__repository__list__item">
		<h6>{{ repo.name | truncateFilter(30) }}</h6>
		<t-button margin-left="auto" @click.native="selectCurrentRepository(index)">
			Open
		</t-button>
		<div
			class="welcome__repository__list__item__settings"
			@click="openRepositorySettings(index)"
		>
			<settingsIcon />
		</div>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../TLayouts/TFlexbox";
import truncateFilter from "../../filters/truncate";
import TButton from "../TButton/TButton";
import settingsIcon from "../icon/settings";

export default {
	name: "RepositoryItem",
	components: {
		TFlexbox,
		TButton,
		settingsIcon
	},
	filters: [truncateFilter],
	props: {
		repo: {
			type: Object,
			default: () => {
				return {};
			}
		}
	}
};
</script>

<style lang="sass"></style>
