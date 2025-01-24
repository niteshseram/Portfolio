---
"title": 'Contact Form in Next.js with Nodemailer'
"publishedAt": '2021-09-14'
"summary": 'This is a walk-through of how to implement an email contact form with Next.js and Nodemailer'
"image": /images/nextjs-with-nodemailer/banner.png
---

<Image
	alt='Contact Form in Nextjs with Nodemailer'
	src='/images/nextjs-with-nodemailer/banner.png'
	width={2560 / 2}
	height={1440 / 2}
	priority
/>

### Introduction

If you were wondering about implementing an email contact form in your Next.js app, this tutorial will walk you through all those steps to help you setup up your contact form successfully.

Even I, myself have implemented the contact form for this website with [Nodemailer](https://nodemailer.com/).

If you are someone who wants to check the code directly, you check it in [CodeSandbox](https://codesandbox.io/s/nextjs-contact-form-e07jm) or my website [repo](https://github.com/niteshseram/niteshseram.in) where I have implemented the contact form myself.

#### Requirements

- Node.js 12.0 or later

This blog is going to be a little long, so hang tight, and let's get started!

### Setting up the Next.js app

Let us first set up our Next.js app by running the below command in our terminal or command prompt.

```bash
npx create-next-app
```

After running the above command, you will end up with a starter template of Next.js app.

You can check if everything is working fine till now by running the app locally. To run the app locally, run the below command-

```bash
yarn dev
# or
npm run dev
```

### Create the contact form

Let's create the contact form directly inside our `pages/index.js` file.

Clean up everything from `index.js` file which was present previously and paste the below code.

```js
import { useState } from 'react'
import styles from '../styles/Home.module.css'
export default function Home() {
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		message: '',
	})

	const [form, setForm] = useState('')

	const handleChange = (e) => {
		setInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}))
	}

	const onSubmitForm = async (e) => {
		e.preventDefault()

		if (inputs.name && inputs.email && inputs.message) {
			setForm({ state: 'loading' })
			try {
				const res = await fetch(`api/contact`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(inputs),
				})

				const { error } = await res.json()

				if (error) {
					setForm({
						state: 'error',
						message: error,
					})
					return
				}

				setForm({
					state: 'success',
					message: 'Your message was sent successfully.',
				})
				setInputs({
					name: '',
					email: '',
					message: '',
				})
			} catch (error) {
				setForm({
					state: 'error',
					message: 'Something went wrong',
				})
			}
		}
	}
	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={(e) => onSubmitForm(e)}>
				<input
					id='name'
					type='text'
					value={inputs.name}
					onChange={handleChange}
					className={styles.inputField}
					placeholder='Name'
					required
				/>
				<input
					id='email'
					type='email'
					value={inputs.email}
					onChange={handleChange}
					className={styles.inputField}
					placeholder='Email'
					required
				/>
				<textarea
					id='message'
					type='text'
					value={inputs.message}
					onChange={handleChange}
					className={styles.inputField}
					placeholder='Message'
					rows='5'
					required
				/>
				<input type='submit' className={styles.button} />
				{form.state === 'loading' ? (
					<div>Sending....</div>
				) : form.state === 'error' ? (
					<div>{form.message}</div>
				) : (
					form.state === 'success' && <div>Sent successfully</div>
				)}
			</form>
		</div>
	)
}
```

So, we are adding three input fields which are name, email, and message field. Let's understand the code.

```js
const [inputs, setInputs] = useState({
	name: '',
	email: '',
	message: '',
})
```

The above code is simply initializing state `inputs` by an object which includes all the fields to store its value.

```js
const [form, setForm] = useState('')
```

The above code is also declaring a state `form` for storing any state related to the form like if it is still sending or if there is an error or if the message has been sent successfully.

```js
const handleChange = (e) => {
	setInputs((prev) => ({
		...prev,
		[e.target.id]: e.target.value,
	}))
}
```

The above code is for handling any change in each input field. Every time when we enter a character in each input field, an event _e_ is triggered which is passed into _handleChange()_ function as a parameter that update the `inputs` state.

So, _handleChange()_ function is triggered every time when we enter a character in each field.

```js
<input
	id='name'
	type='text'
	value={inputs.name}
	onChange={handleChange}
	className={styles.inputField}
	placeholder='Name'
	required
/>
```

In the above code, we set the value of the field using `inputs.name` state. Also, we use onChange properties which call the _handleChange()_ function.

```js
const onSubmitForm = async (e) => {
	e.preventDefault()

	if (inputs.name && inputs.email && inputs.message) {
		setForm({ state: 'loading' })
		try {
			const res = await fetch(`api/contact`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(inputs),
			})

			const { error } = await res.json()

			if (error) {
				setForm({
					state: 'error',
					message: error,
				})
				return
			}

			setForm({
				state: 'success',
				message: 'Your message was sent successfully.',
			})
			setInputs({
				name: '',
				email: '',
				message: '',
			})
		} catch (error) {
			setForm({
				state: 'error',
				message: 'Something went wrong',
			})
		}
	}
}
```

Now, the above code is for handling on submit action. So, what we are doing here is that first, we are checking if all the fields are filled and it's not empty just for the safe side. If all the fields are not empty then, we are doing a POST request to the API endpoint URL `api/contact`. In the body of the POST request, we are passing the inputs state.

Then, we get the value of the `error` from respond JSON and check if there is an error being sent in the response.

So, we set the form state using `setForm` with an object with `state` and `message` properties correspondingly for when an error is present and when no error is present.

We wrapped the `fetch` code with try and catch because when there is any error related to the API endpoint `/api/contact` like if the URL is incorrect, it will be caught by the catch block.

So, this _onSubmitForm()_ method is called when we click the submit button.

Now, let's do some simple styling for the contact form. I will keep it simple since
we are focusing more on implementing the contact form functionality and not on design.

As we can see, in our `index.js` file we are importing `Home.module.css` file at the top. So, let's see how the CSS file looks like.

```css
.container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  width: 50rem;
}

.inputField {
  margin: 10px 0;
  padding: 5px 7px;
}

.button {
  cursor: pointer;
  padding: 10px 0px;
}
```

So, this is the simple CSS for the contact form and is not too fancy.

Now, let's try to run and see if the application is working fine. When we run our
app and try to submit the form, we will see an error in the console related to **_POST
404_**. It is because the POST request to the API endpoint `api/contact` is not successful
because the URL is not found.

Now, we are done with the frontend part of the implementation.

### Implement the API endpoint

Go to the `pages/api` folder and create the `contact.js` file inside it.

In Next.js, any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a page. So, after creating your `contact.js` file, your API endpoint will be `/api/contact`.

```js
export default async (req, res) => {
  const { name, email, message } = req.body;
  console.log(name, email, message);
	return res.status(200).json({ error: "" });
}
```

Paste the above code inside your `contact.js` file. Here, we are simply destructuring the name, email, and message from the request's body that you have sent from the front end. Then, simply print those values in your terminal.

Now, run your app and you should see those values in your terminal when you click the submit button of the form.

Now, let's get into the main implementation with [Nodemailer](https://nodemailer.com/).
First, install Nodemailer in your Next.js app. To install, run the below command-

```bash
yarn add nodemailer
# or
npm i nodemailer
```

Now paste the below code in your `contact.js` file by removing all the previous code.

```js
import nodemailer from "nodemailer";

export default async (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "example@gmail.com",
      subject: `Contact form submission from ${name}`,
      html: `<p>You have a contact form submission</p><br>
        <p><strong>Email: </strong> ${email}</p><br>
        <p><strong>Message: </strong> ${message}</p><br>
      `
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });
};
```

First, at the top, we are importing Nodemailer.

```js
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
})
```

Then, we create a transporter object which helps in sending the email. There are multiple ways to create a transporter object using different transport methods. Here, we are using `SMTP` with Gmail.

Then, we provide the username and password for that SMTP server.

We then call the _sendMail()_ method using that transporter object. Inside that method, we pass an object which contains mainly-

- **from**- the sender email address
- **to**- your email address in which you want to receive this contact form submission
- **subject**- Subject of the email
- **html**- the body of the email where we are adding the sender email and the message from the contact form

```js
process.env.SMTP_USER
```

The above code is for accessing the `SMTP_USER` value from the environment variables and the same goes for `SMTP_PASSWORD`. But before setting the environment variables, let's first get the `SMTP_USER` and `SMTP_PASSWORD`.

### Create the Gmail account for SMTP user and password

You can use your personal Gmail account if you want. But, I will suggest you create a separate Gmail account for this purpose. There will be absolutely no difference between the two accounts. It is just that we will be accessing that Gmail account using 3rd party app, so to be on the safe side, use a separate Gmail. Although for high security, we enable two-factor authentication, still I would go with a separate account.

You can go ahead and create the Gmail account by yourself like we do normally.

<Image
	alt='Manage Google Account'
	src='/images/nextjs-with-nodemailer/img1.PNG'
	width={1083}
	height={605}
/>
After creating the account, go to _Manage Google Account_, then go to _Security_
option and configure the 2-Step Verification. If you have configured from before,
then you will see the _App passwords_ option.

<Image
	alt='2 Step Verification'
	src='/images/nextjs-with-nodemailer/img2.PNG'
	width={1558}
	height={504}
/>
<Image
	alt='App passwords'
	src='/images/nextjs-with-nodemailer/img3.PNG'
	width={1464}
	height={405}
/>
Click on App passwords and select the options as below image.

<Image
	alt='App passwords options'
	src='/images/nextjs-with-nodemailer/img4.PNG'
	width={929}
	height={339}
/>
Then, we will get your password which is going to be your `SMTP_PASSWORD`. And your
`SMTP_USER` will be that Gmail address.

Now, we have got the `SMTP_USER` and`_SMTP_PASSWORD`, let's see how to set up the environment variable.

### Set up the environment variable

For **_local development_**, create a `_.env.local` file in the root directory and add the values in the file like given below.

```js
SMTP_USER=example@gmail.com
SMTP_PASSWORD=your app password
```

These values can be accessed like `process.env.SMTP_USER` and `process.env.SMTP_PASSWORD` as we did in `contact.js` file.

Don't forget to add this `.env.local` file inside your `.gitignore` if you're pushing
this code in GitHub.

For **_production_**, you have to put those environment variables in the platform
of the hosting provider. Let's take [Vercel](https://vercel.com) for our case and
see how can we set the environment variables in Vercel.

In Vercel, go to your Project settings and then go to the Environment Variables option from the left.

<Image
	alt='Vercel Project settings'
	src='/images/nextjs-with-nodemailer/img5.PNG'
	width={1330}
	height={757}
/>

Then, you have to provide the name and value for that environment variables `SMTP_USER` and `SMTP_PASSWORD` like below image.

<Image
	alt='Vercel Environment variables'
	src='/images/nextjs-with-nodemailer/img6.PNG'
	width={1342}
	height={673}
/>

After adding the environment variables, make sure to redeploy the project. Otherwise, it won't work.

### Final Testing

Now, run your app locally or in production and try submitting the contact form. You will see the message _Your message was sent successfully_ below your contact form and you will finally receive the mail upon the contact form submission.

Hooray! We are done.🎉
