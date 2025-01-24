---
"title": 'Setting up ESLint, Prettier, and Husky with lint-staged for your Next.js Project'
"publishedAt": '2021-09-26'
"summary": 'This is a walk-through of those steps required in setting up ESLint, Prettier, and Husky with lint-staged for a Next.js project'
"image": /images/blog/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/banner.png
---

<Image
	alt='Blog Banner'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/banner.png'
	width={2240 / 2}
	height={1260 / 2}
	priority
/>

### Introduction

This blog will walk you through all those steps for setting up ESLint, Prettier, and Husky with lint-staged for your Next.js project.

Before we get started, let's understand what ESLlint, Prettier, Husky, and lint-staged are. [ESLint](https://eslint.org/) is a tool that checks your Javascript code on the go while writing it to identify and report any issue or bug in your code. [Prettier](https://prettier.io/) is used to scan any issue related to styling and automatically refactoring your code to ensure consistent rules are followed across your whole codebase like to use semicolon at the end of a statement or not in the whole codebase. [Husky](https://github.com/typicode/husky) is a tool that allows us to easily wrangle [Git hooks](https://git-scm.com/docs/githooks) and run the scripts we want at those stages. In simple words, Husky is a tool that allows you to run some scripts before your git commits like running a linting script to check for any issue in your code before you make the git commit. [lint-staged](https://github.com/okonet/lint-staged) allow you to run linters only against the staged git files and not on all the code files.

### Setting up the project

If you don't want to try this on in your Next.js project, then let's create a Next.js project by running the below command in the directory where you want to create your project.

```bash
npx create-next-app nextjs-linting-project
# or
yarn create next-app nextjs-linting-project
```

Feel free to replace `nextjs-linting-project` with whatever project name you prefer.
This will create a folder named `nextjs-linting-project`. Once it is done, navigate inside that folder and we are ready to go!

[Follow along with the git commits](https://github.com/niteshseram/nextjs-linting-project/commit/498b1419459f0c79d2850956cc360bd77f57ebc4)

### Setting up ESLint

Since version 11.0.0, Next.js provides an ESLint integration out of the box. To set this up, add the script `"lint": "next lint"` inside the scripts object of your [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/498b1419459f0c79d2850956cc360bd77f57ebc4/package.json#L9) file.

Now, run the command `yarn lint` or `npm run lint` in your terminal and it shows you two options **Strict** and **Base**.

Select **Strict**, if you want a Next.js base ESLint configuration with a stricter Core Web Vitals rule-set. This is a recommended option by Next.js but for this tutorial, select **Strict** option only if you are working with Core Web Vitals. Otherwise, select **Base** which is the basic ESLint configuration that comes with Next.js. Once you select any of the options, it will install `eslint` and `eslint-config-next` and also automatically add the `.eslintrc.json` file which is the configuration file for ESLint.

Now, run the command `yarn lint` in your terminal again and this time it will show some warning like in the below image.

<Image
	alt='ESLint Warning Picture'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/1.PNG'
	width={1123}
	height={199}
/>

I won't be going into details on explaining how to remove those warnings. You can check about the warning by hovering over the code and going through the link present in the popup.

Now, we can see that our linting is working but we are not done. This linting checks only some of the base rules decided by Next.js. But we want to make our code more cleaner like it should show a warning if we are declaring a variable and not using it. So, this issue will not be caught by own current ESLint.

You can try by going to your `pages/index.js` and declaring any variables or import something that you are not using in that file and then, you would be seeing that there is no error in the code editor and as well as not shown in the console when you run `yarn lint` as shown in the below images.

<Image
	alt='ESLint in Code Editor'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/2.PNG'
	width={994}
	height={563}
/>
In the above image, you can see that a variable `abc` is declared but not used anywhere
in that file. But, the variable `abc` is not underline which means no issue was found.
<Image
	alt='ESLint in Console'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/1.PNG'
	width={1123}
	height={199}
/>

In the above image, the warning in the console is related to files inside `api` directory and not related to `pages/index.js` file. So, it is not caught by ESLint.

So, to add more rules to your existing ESLint, you have to extends `eslint:recommended` in your [`.eslintrc.json`](https://github.com/niteshseram/nextjs-linting-project/blob/290db372928963f3b3aa094e80c9b533299401b2/.eslintrc.json#L2) file like below.

```json title="eslintrc.json"
{
  "extends": ["eslint:recommended","next"]
}
```

`eslint:recommended` add more rules to your existing ESLint configuration. Now, you would see some warning in your code editor where you have declared the variables or imported something and not using it. You can also run the command yarn lint and now it should show you the warning in your console too as you can see in the below image.

<Image
	alt='ESLint in VS Code'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/3.PNG'
	width={1032}
	height={555}
/>
In the above image, you can see that the variable `abc` is now underline and is being
caught by ESLint.
<Image
	alt='ESLint in Console'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/4.PNG'
	width={1110}
	height={312}
/>
In the above image, a warning can be seen regarding the unused variable `abc`.

**Note:** By default, Next.js runs ESLint for all the files in the `pages/`, `components/`, and `lib/` directories.

If you try creating a file inside a different directory other than these, it might show the warning or issue in the code editor but it will not be caught while running the command `yarn lint`.

If you want to run ESLint in other directories like `abc` as well, then create a [`next.config.js`](https://github.com/niteshseram/nextjs-linting-project/blob/b70b2a0fa1af16cf6da495acdc9d50a60462aa56/next.config.js) file in your root directory and add the below code in that file.

```js title="next.config.js"
module.exports = {
  eslint: {
    dirs: ['pages', 'components', 'lib','abc'],
  },
}
```

As you can see, we have added abc directory in the list which will allow ESLint to run on those files as well as present inside abc directory.

### Setting up Prettier

To set up Prettier, let's install prettier and eslint-config-prettier by running the below command.

```bash
yarn add -D prettier eslint-config-prettier
or
npm i --save-dev prettier eslint-config-prettier
```

`eslint-config-prettier` is to used to resolve the conflict between ESLint and Prettier because ESLint also contains some code formatting rules.

Once you installed these, create a [`.prettierrc.json`](https://github.com/niteshseram/nextjs-linting-project/blob/fed364b39693ae0abf45c6976a386a01b4d924af/.prettierrc.json) file and add the below rules in the file.

```json title=".prettierrc.json"
{
	"endOfLine": "lf",
	"printWidth": 80,
	"trailingComma": "es5",
	"semi": false,
	"jsxSingleQuote": true,
	"singleQuote": true,
	"useTabs": true,
	"tabWidth": 2,
	"arrowParens": "always"
}
```

Feel free to modify according to your requirement. There are more [rules](https://prettier.io/docs/en/options.html) if you like to add.

After this configuration, add prettier to your [`.eslintrc.json`](https://github.com/niteshseram/nextjs-linting-project/blob/fed364b39693ae0abf45c6976a386a01b4d924af/.eslintrc.json#L2) file like below.

```json title=".eslintrc.json"
{
	"extends": ["eslint:recommended", "next", "prettier"]
}
```

Once you are done with these steps, you are ready with Prettier as well. It will auto-format your code when you save your code if you have enabled the `Format On Save` option in your VS Code editor.

But if you want to format all your files by running a command, then add a script `"format": "prettier --write ."` inside the scripts object in your [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/23cc3e506fdce610220ea54b605cba323ab6a3c5/package.json#L10) file.

Once done, run `yarn format` or `npm run format` to format all your codes.

Now, we are good with prettier. But we want to run all these formatting and linting scripts automatically when we do git commit. Then, there comes Husky which can do that kind of stuff.

### Setting up Husky with lint-staged

Let's install Husky and lint-staged by running the below command.

```bash
yarn add -D husky lint-staged
# or
npm i --save-dev husky lint-staged
```

Once you are done installing, add a script `"prepare": "husky install"` in the scripts object of your [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/33deffaa7a2e88540b5d583d7614458802f26b66/package.json#L11) file. Then, run the command `yarn prepare` or `npm run prepare` which will install some scripts to run git hooks.

Then, again in [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/411c201baeade8f51900e95d32ddf099db1587f8/package.json#L14-L21) file, add the new object given below.

```json title="package.json"
"lint-staged": {
		"*.js": [
			"eslint --fix"
		],
		"*.{html,js}": [
			"prettier --write"
		]
	}
```

This `lint-staged` object will run ESLint and Prettier to only those files which are git staged. But wait for a second, why running `eslint --fix` instead of `next lint` in the above `lint-staged` script? The reason is Next.js is having an [issue](https://github.com/vercel/next.js/issues/27997) running next lint with lint-staged and hopefully it will be fixed soon. So, for time being, you can use `eslint --fix`.

Then, add a script `"precommit": "lint-staged"` inside the scripts object of your [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/411c201baeade8f51900e95d32ddf099db1587f8/package.json#L12) which will allow you to run the `lint-staged` object as a script by running `yarn precommit` or `npm run precommit`.

You are almost there. Now, run this command `npx husky add .husky/pre-commit "npm run precommit"` to add a pre-commit hook which will run `npm run precommit` command every time when you make a git commit. This will prevent any unformatted or linting issue code from being push into your Github repository.

Woooh! We are done.🎉
