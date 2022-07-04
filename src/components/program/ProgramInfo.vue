<template>
	<div>
		<div class="mb-3 d-flex align-center">
			<h1 class="text-body-1 font-weight-medium">Id</h1>
			<v-spacer></v-spacer>
			<div class="text-body-1">{{ program.id }}</div>
		</div>
		<div class="mb-3 d-flex align-center">
			<h1 class="text-body-1 font-weight-medium">Name</h1>
			<v-spacer></v-spacer>
			<div class="text-body-1">{{ program.name }}</div>
		</div>
		<div class="mb-3 d-flex align-center">
			<h1 class="text-body-1 font-weight-medium">Name En</h1>
			<v-spacer></v-spacer>
			<div class="text-body-1">{{ program.nameEn }}</div>
		</div>
		<div class="mb-3 d-flex align-center">
			<h1 class="text-body-1 font-weight-medium">Lesson Type</h1>
			<v-spacer></v-spacer>
			<div class="text-body-1">
				{{ program.lessonType === 1 ? 'Call' : 'Talk' }}({{
					program.lessonType
				}})
			</div>
		</div>
		<div class="mb-3 d-flex align-center">
			<h1 class="text-body-1 font-weight-medium">Status</h1>
			<v-spacer></v-spacer>
			<div class="text-body-1">
				{{ program.active === 1 ? 'Active' : 'Inactive' }}({{ program.active }})
			</div>
		</div>
		<div class="mb-3 d-flex align-center">
			<h1 class="text-body-1 font-weight-medium">Group</h1>
			<v-spacer></v-spacer>
			<div class="text-body-1">
				{{ program.groupName }}
			</div>
		</div>
		<div class="mb-3 d-flex align-center">
			<h1 class="text-body-1 font-weight-medium">Tag</h1>
			<v-spacer></v-spacer>
			<div class="text-body-1">
				{{ program.topic }}
			</div>
		</div>
		<div class="mb-3 d-flex align-center">
			<h1 class="text-body-1 font-weight-medium">Structure</h1>
			<v-spacer></v-spacer>
			<div class="text-body-1">
				{{ program.structure }}
			</div>
		</div>
		<div class="mb-3">
			<h1 class="text-body-1 font-weight-medium">Description</h1>
			<div class="text-body-1">
				{{ program.description }}
			</div>
		</div>
		<div class="mb-3">
			<h1 class="text-body-1 font-weight-medium">Recommend</h1>
			<div class="text-body-1">
				{{ program.recommended }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		program: {
			required: true,
			type: Object,
		},
	},
}
</script>

<style lang="scss" scoped></style>
