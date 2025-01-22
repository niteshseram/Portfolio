import AnimatedText from '@/src/components/AnimatedText'
import Timeline from '@/src/components/Timeline'
import FadeDown from '@/src/components/animations/FadeDown'
import FadeUp from '@/src/components/animations/FadeUp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'About',
	description: 'Software Engineer and Open Source enthusiast',
}

const About = () => {
	return (
		<section className='prose  prose-neutral dark:prose-invert my-10'>
			<FadeDown duration={0.4}>
				<h1 className='heading custom-underline'>
					<AnimatedText text='About me' />
				</h1>
				<p>
					Hello there, I&apos;m a <b>Software Engineer</b> with a passion for
					all things frontend. I work at <b>Auzmor</b>, where I spend my days
					building Learning Management Solution(LMS).
				</p>
				<p>
					As a lifelong learner, I&apos;m always looking for opportunities to
					grow and push myself to new heights. That&apos;s why I love
					contributing to <b>Open Source</b> projects whenever I can - it&apos;s
					a chance to collaborate with other talented developers and make a real
					impact on the world.
				</p>

				<h4 className='text-lg md:text-xl font-medium dark:text-light text-dark'>
					When I&apos;m not at my desk...
				</h4>
				<p>
					Don&apos;t let all that talk of coding fool you - I&apos;m also a big
					believer in having fun and trying to have balance between work and
					play. That&apos;s why you&apos;ll often find me hitting the gym trying
					to stay fit and healthy, hanging out with friends or enjoying a good
					Netflix and chill session, I&apos;m always up for an adventure.
				</p>
			</FadeDown>
			<FadeUp duration={0.4}>
				<h2 className='text-xl md:text-2xl text-dark dark:text-light'>
					<AnimatedText text='Timeline' />
				</h2>
				<Timeline />
			</FadeUp>
		</section>
	)
}

export default About
