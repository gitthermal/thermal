<template>
	<div>
		<vue-scrollbar>
			<slot />
		</vue-scrollbar>
	</div>
</template>

<script>
import VueScrollbar from "vue2-scrollbar";

export default {
	name: "TScrollbarLayout",
	components: {
		VueScrollbar
	}
};
</script>
