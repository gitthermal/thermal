export default {
	methods: {
		closeModal(name) {
			this.$store.commit(`modal/toggle${name}Modal`);
		}
	}
};
