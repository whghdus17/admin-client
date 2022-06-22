<template>
	<v-autocomplete
		outlined
		dense
		:laoding="isLoading"
		:items="activeTutors"
		v-model="tutor"
		:item-text="item => `${item.name}(#${item.id})`"
		return-object
		@click:append="cancelSelect"
		append-icon="mdi-window-close"
		@change="$emit('selectTutor', tutor)"
	></v-autocomplete>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('tutor')
const R = require('ramda')

export default {
	props: {
		selectedTutorId: {
			required: false,
		},
	},
	data() {
		return {
			tutor: null,
		}
	},
	computed: {
		...mapGetters(['tutors', 'isLoading']),
		activeTutors() {
			return R.filter(t => t.active === 1, this.tutors)
		},
	},
	created() {
		if (this.tutors.length === 0) this.get()
	},
	methods: {
		...mapActions(['get']),
		cancelSelect() {
			this.tutor = null
			this.$emit('selectTutor', null)
		},
	},
}
</script>

<style lang="scss" scoped></style>
