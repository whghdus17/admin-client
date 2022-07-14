<template>
	<div>
		<span @click="audioControl()" :class="color" class="hover-pointer">
			<v-icon small :class="color" v-if="!isPlaying">mdi-volume-high</v-icon>
			<v-icon small :class="color" v-else>mdi-pause</v-icon>
		</span>
	</div>
</template>

<script>
import Api from '@/services/index'

export default {
	props: {
		script: {
			required: true,
		},
		small: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			default: 'primary--text',
		},
		text: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			source: null,
			isPlaying: false,
			pronunciation: null,
			gender: null,
			speed: null,
		}
	},
	methods: {
		getOptions() {
			this.pronunciation = localStorage.getItem('tts_pronunciation')
				? localStorage.getItem('tts_pronunciation')
				: '미국발음'
			this.gender = localStorage.getItem('tts_gender')
				? localStorage.getItem('tts_gender')
				: '여'
			this.speed = localStorage.getItem('tts_speed')
				? localStorage.getItem('tts_speed')
				: 1
			let voiceName = 'en-US-Wavenet-F'
			if (this.pronunciation === '미국발음' && this.gender === '남')
				voiceName = 'en-US-Wavenet-D'
			else if (this.pronunciation === '미국발음' && this.gender === '여')
				voiceName = 'en-US-Wavenet-F'
			else if (this.pronunciation === '영국발음' && this.gender === '남')
				voiceName = 'en-GB-Wavenet-B'
			else if (this.pronunciation === '영국발음' && this.gender === '여')
				voiceName = 'en-GB-Wavenet-C'
			return [voiceName, this.speed]
		},
		getAudio() {
			let options = this.getOptions()
			return new Promise((resolve, reject) => {
				let text = this.script
				if (text.includes('Sample answer: '))
					text = text.replace('Sample answer: ', '')

				let query = `?text=${encodeURIComponent(text)}&voiceName=${
					options[0]
				}&speakingRate=${options[1]}`
				Api.get(`/text-to-speech${query}`)
					.then(result => {
						// this.source = result.data
						this.source = new Audio('data:audio/MP3;base64,' + result.data)
						resolve()
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		audioControl() {
			if (this.source === null) {
				this.getAudio().then(() => {
					this.isPlaying = true
					this.playAudio()
					// this.Sound('data:audio/wav;base64,' + this.source)
				})
			} else if (this.source.paused) {
				this.isPlaying = true
				this.playAudio()
			} else {
				this.isPlaying = false
				this.source.pause()
			}
		},
		playAudio() {
			this.source.addEventListener('ended', () => {
				this.isPlaying = false
			})
			this.source.play()
		},
	},
}
</script>
