<template>
	<t-flexbox flex-direction="column" :flex-grow="1">
		<navbar />
		<t-flexbox
			flex-direction="row"
			:flex-grow="1"
			:flex-shrink="1"
			:flex-basis="0"
			style="height: 100%"
		>
			<sidebar />
			<router-view />
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../../components/TLayouts/TFlexbox";
import navbar from "../../components/navbar";
import sidebar from "../../components/sidebar";
import database from "../../../database";

export default {
	name: "RepositoryIndex",
	components: {
		TFlexbox,
		navbar,
		sidebar
	},
	beforeRouteEnter(to, from, next) {
		database.all(
			`SELECT
				repository.repositoryId,
				repository.directoryPath,
				repositorySettings.commitFeature,
				repositorySettings.remoteFeature,
				gitRepository.remoteUrl
			FROM repository
			INNER JOIN repositorySettings USING(repositoryId)
			INNER JOIN gitRepository USING(repositoryId)
			WHERE repositoryId IS $repositoryId`,
			{
				$repositoryId: to.params.repositoryId
			},
			(err, data) => {
				if (err) console.log(err);
				else {
					next(vm => {
						vm.$store.commit("repository/updateRepositoryData", {
							...data[0]
						});
					});
				}
			}
		);
	},
	beforeRouteUpdate(to, from, next) {
		database.all(
			`SELECT
				repository.repositoryId,
				repository.directoryPath,
				repositorySettings.commitFeature,
				repositorySettings.remoteFeature,
				gitRepository.remoteUrl
			FROM repository
			INNER JOIN repositorySettings USING(repositoryId)
			INNER JOIN gitRepository USING(repositoryId)
			WHERE repositoryId IS $repositoryId`,
			{
				$repositoryId: to.params.repositoryId
			},
			(err, data) => {
				if (err) console.log(err);
				else {
					this.$store.commit("repository/updateRepositoryData", {
						...data[0]
					});
					next();
				}
			}
		);
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit("repository/updateRepositoryData", {});
		next();
	}
};
</script>
