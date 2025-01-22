import Link from 'next/link'
import { FiTwitter, FiMail, FiArrowRight } from 'react-icons/fi'

const Contact = () => {
  return (
		<section id='contact' className='pt-10'>
			<h2 className='section-heading custom-underline'>Get In Touch</h2>
			<p>
				Wooh! You have reached the bottom of the page. Looking to collaborate,
				discuss an opportunity, or just want to say hi? I&apos;m all in! Just
				drop me an email, or hit me up on Twitter to get the conversation
				started. No matter how you choose to connect, I can&apos;t wait to hear
				from you!
			</p>
			<div className='flex gap-16 mt-6'>
				<Link
					href='mailto:contact@niteshseram.in?subject=Hi%20Nitesh!'
					className='flex items-center gap-2 hover:text-primary transition'
					title='Compose an email to Nitesh'
				>
					<FiMail />
					<div className='flex items-center'>
						<span>Email Me&nbsp;</span>
						<span className='animate-bounce-right'>
							<FiArrowRight />
						</span>
					</div>
				</Link>
				<Link
					href='https://twitter.com/messages/compose?recipient_id=2727845026&text='
					target='_blank'
					className='flex items-center gap-2 hover:text-primary transition'
					title='Compose a twitter direct message for Nitesh'
				>
					<FiTwitter />
					<div className='flex items-center'>
						<span>Twitter&nbsp;</span>
						<span className='animate-bounce-right'>
							<FiArrowRight />
						</span>
					</div>
				</Link>
			</div>
		</section>
	)
}

export default Contact