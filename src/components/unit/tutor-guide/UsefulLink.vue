<template>
	<div>
		<h3>
			<strong>Links to Useful Pages</strong>
		</h3>
		<div class="pa-3" style="border: 1px solid #dadada; background-color: #fff">
			Kindly direct your students to these pages if they ever make inquiries
			about the following information.
			<br />
			<br />
			<strong
				>Lesson Style Preferences (Indicate your lesson style preferences) (You
				need to be logged in)</strong
			>
			<CopyText
				:val="'https://my.tella.co.kr/setting/style/talk'"
				:id="`userfule-link-1`"
			/>
			<CopyText
				:val="'https://my.tella.co.kr/setting/style/call'"
				:id="`userfule-link-1-1`"
			/>
			On Lesson Style Preferences, students can indicate their lesson style
			preferences so that the tutors can refer to them during lessons.
			<br />
			<br />
			<strong
				>MyHome (Book/change/preview lessons, and check lesson credits) (You
				need to be logged in)</strong
			>
			<br />On MyHome, students can book, change, and preview their lessons,
			check how many lesson credits they have left, and when they expire.
			<CopyText :val="'https://my.tella.co.kr'" :id="`userfule-link-2`" />
			<br />
			<strong
				>Lesson History (lesson logs, corrections, TTS (text-to-speech), and
				lesson analysis) (You need to be logged in)</strong
			>
			<br />
			<CopyText
				:val="'https://my.tella.co.kr/lessons'"
				:id="`userfule-link-3`"
			/>On Lesson History, students can check their lesson logs, the analysis of
			the lessons, corrections made by tutors and listen to the corrections
			using the TTS reader.
			<br />
			<br />
			<strong>Program Preview (You need to be logged in)</strong>
			<br />
			<CopyText
				:val="'https://my.tella.co.kr/program'"
				:id="`userfule-link-4`"
			/>On Program Preview, students have access to all Tella programs and
			units, preview all the lesson content including word cards, role-play and
			discussion questions, and listen to the role-play lines using the TTS
			reader.
			<br />
			<br />
			<strong>Monthly Progress Report (You need to be logged in)</strong>
			<br />
			<CopyText
				:val="'https://my.tella.co.kr/monthly-report'"
				:id="`userfule-link-5`"
			/>On Monthly Progress Report, students can check their TOP 3 most
			sought-after tutors and the analysis of their lessons by the month in
			comparison with the previous month and with the very first month when they
			first started Tella lessons, along with their lesson history.
			<br />
			<br />
			<strong>About Courses (Program description, level, tags)</strong>
			<br />
			<CopyText :val="'tella.co.kr/programs'" :id="`userfule-link-6`" />On About
			Courses, students can check what programs and courses Tella offers, check
			the levels of the programs and read detailed descriptions of each program.
			<br />
			<br />
			<strong>About Tutors</strong>
			<br />
			<CopyText :val="'tella.co.kr/tutors'" :id="`userfule-link-7`" />On About
			Tutors, students can read Tella tutors' self-introduction messages, check
			tutor ratings, and find tutors that suit their needs via Tag Search.
			<br />
			<br />
			<strong>Customer Inquiries</strong>
			<br />
			<CopyText :val="'tella.channel.io'" :id="`userfule-link-8`" />On Customer
			Inquiries, students can contact Customer Service and make inquiries, and
			expect to receive answers within one business day.
			<br />
			<br />
			<strong>Notice</strong>
			<br />
			<CopyText :val="'tella.co.kr/notices'" :id="`userfule-link-9`" />On
			Notice, students can check all the important announcements made by the HQ.
		</div>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideUsefulLink',
	components: {
		CopyText,
	},
}
</script>
