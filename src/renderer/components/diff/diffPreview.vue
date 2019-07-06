<template>
	<VueScrollbar class="diff__preview">
		<div>
			<div v-for="(data, index) in preview" :key="index">
				<diff-line
					:gutter="codeGutter(data, index)"
					:color="codeColor(data)"
					:status="codeStatus(data)"
					:code="codeLine(data)"
				/>
			</div>
		</div>
	</VueScrollbar>
</template>

<script>
import VueScrollbar from "vue2-scrollbar";
import DiffLine from "./diffLine";

export default {
	name: "DiffPreview",
	components: {
		VueScrollbar,
		DiffLine
	},
	props: {
		preview: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			gutterChunk: []
		};
	},
	methods: {
		codeGutter(code, index) {
			let gutterData = [];
			if (code.charAt(0) === "@") {
				let gutterString = code.split(/@@(.*?)@@/)[1].trim();
				gutterData = gutterString.split(" ");
				this.gutterChunk = gutterData;
				return ["", ""];
			}
			return this.gutterChunk;
		},
		codeStatus(code) {
			if (code.charAt(0) !== ("@" || " ")) {
				return code.charAt(0);
			}
		},
		codeLine(code) {
			if (code.charAt(0) === "@") return code;
			return code.slice(1, code.length);
		},
		codeColor(code) {
			switch (code.charAt(0)) {
				case "@":
					return {
						code: "F1F8FF",
						gutter: "DBEDFF",
						border: "C8E1FF"
					};
				case "+":
					return {
						code: "E6FFED",
						gutter: "CDFFD8",
						border: "85E89D"
					};
				case "-":
					return {
						code: "FFEEF0",
						gutter: "FFDCE0",
						border: "FDAEB7"
					};
				case " ":
					return {
						border: "E1E4E8"
					};
			}
		}
	}
};
</script>

<style lang="sass">
.diff__preview
	max-height: 90vh
</style>
