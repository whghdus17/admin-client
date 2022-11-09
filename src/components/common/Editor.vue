<template>
	<div id="editor">
		<div v-if="editor">
			<bubble-menu
				class="bubble-menu"
				:tippy-options="{ duration: 100 }"
				:editor="editor"
			>
				<button
					@click="setLink"
					:class="{ 'is-active': editor.isActive('link') }"
				>
					setLink
				</button>
				<button
					@click="editor.chain().focus().unsetLink().run()"
					:disabled="!editor.isActive('link')"
				>
					unsetLink
				</button>
				<button
					@click="editor.chain().focus().toggleBold().run()"
					:class="{ 'is-active': editor.isActive('bold') }"
				>
					Bold
				</button>
				<button
					@click="editor.chain().focus().toggleItalic().run()"
					:class="{ 'is-active': editor.isActive('italic') }"
				>
					Italic
				</button>
				<button
					@click="editor.chain().focus().toggleStrike().run()"
					:class="{ 'is-active': editor.isActive('strike') }"
				>
					Strike
				</button>
			</bubble-menu>

			<floating-menu
				class="floating-menu"
				:tippy-options="{ duration: 100 }"
				:editor="editor"
			>
				<button
					@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
					:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
				>
					H1
				</button>
				<button
					@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
					:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
				>
					H2
				</button>
				<button
					@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
					:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
				>
					H3
				</button>
				<button
					@click="editor.chain().focus().toggleBulletList().run()"
					:class="{ 'is-active': editor.isActive('bulletList') }"
				>
					Bullet List
				</button>
			</floating-menu>
		</div>
		<editor-content :editor="editor" />
	</div>
</template>

<script>
import Link from '@tiptap/extension-link'
import { BubbleMenu, Editor, EditorContent, FloatingMenu } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
	components: {
		BubbleMenu,
		EditorContent,
		FloatingMenu,
	},
	props: {
		value: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			editor: null,
		}
	},

	watch: {
		value(value) {
			// HTML
			const isSame = this.editor.getHTML() === value

			// JSON
			// const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

			if (isSame) {
				return
			}

			this.editor.commands.setContent(value, false)
		},
	},

	mounted() {
		this.editor = new Editor({
			content: this.value,
			extensions: [
				StarterKit,
				Link.configure({
					openOnClick: false,
				}),
			],
			onUpdate: () => {
				// HTML
				this.$emit('input', this.editor.getHTML())

				// JSON
				// this.$emit('input', this.editor.getJSON())
			},
		})
	},

	beforeDestroy() {
		this.editor.destroy()
	},
	methods: {
		setLink() {
			const previousUrl = this.editor.getAttributes('link').href
			const url = window.prompt('URL', previousUrl)

			// cancelled
			if (url === null) {
				return
			}

			// empty
			if (url === '') {
				this.editor.chain().focus().extendMarkRange('link').unsetLink().run()

				return
			}

			// update link
			this.editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: url })
				.run()
		},
	},
}
</script>

<style lang="scss">
#editor {
	/* Basic editor styles */
	.ProseMirror {
		padding: 1em;
		> * + * {
			margin-top: 0.75em;
		}

		ul,
		ol {
			padding: 0 1rem;
		}

		p,
		h1,
		h2,
		h3,
		ul {
			margin-top: 0px;
		}

		li p {
			margin-bottom: 0px;
		}
		blockquote {
			padding-left: 1rem;
			border-left: 2px solid rgba(#0d0d0d, 0.1);
		}
	}

	.bubble-menu {
		display: flex;
		background-color: #0d0d0d;
		padding: 0.2rem;
		border-radius: 0.5rem;

		button {
			border: none;
			background: none;
			color: #fff;
			font-size: 0.85rem;
			font-weight: 500;
			padding: 0 0.2rem;
			opacity: 0.6;

			&:hover,
			&.is-active {
				opacity: 1;
			}
		}
	}

	.floating-menu {
		display: flex;
		background-color: #0d0d0d10;
		padding: 0.2rem;
		border-radius: 0.5rem;

		button {
			border: none;
			background: none;
			font-size: 0.85rem;
			font-weight: 500;
			padding: 0 0.2rem;
			opacity: 0.6;

			&:hover,
			&.is-active {
				opacity: 1;
			}
		}
	}
}
</style>
