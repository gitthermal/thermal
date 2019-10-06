<template>
	<t-card width="small">
		<t-card-header>
			<t-card-header-heading heading="Select repository" />
			<t-card-header-close modal-name="SelectRepository" />
		</t-card-header>
		<t-card-body>
			<repository-list />
		</t-card-body>
		<t-card-footer> </t-card-footer>
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
import repositoryList from "../components/repositoryListView/repositoryList";

// mixins
import closeModalMixin from "../mixins/closeModal";

export default {
	name: "SelectRepository",
	components: {
		TCard,
		TCardHeader,
		TCardHeaderHeading,
		TCardHeaderClose,
		TCardBody,
		TCardFooter,
		repositoryList
	},
	mixins: [closeModalMixin]
};
</script>
