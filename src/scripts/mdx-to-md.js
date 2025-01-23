const fs = require('fs')
const path = require('path')

const INPUT_DIR = './content'
const OUTPUT_DIR = '__translations__'

// Recursively find all .mdx files in the content directory
function getMdxFiles(dir) {
	let results = []
	const list = fs.readdirSync(dir)

	list.forEach((file) => {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		if (stat && stat.isDirectory()) {
			results = results.concat(getMdxFiles(filePath)) // Recursive call for subdirectories
		} else if (filePath.endsWith('en-US.mdx')) {
			results.push(filePath)
		}
	})

	return results
}

// Convert .mdx to .md and .json (extract JSX components)
function convertMdxToMd(mdxFilePath) {
	const mdxContent = fs.readFileSync(mdxFilePath, 'utf-8')

	// Capture JSX components (simplified by capturing anything between '<>' as JSX)
	const jsxComponents = []
	const jsxRegex = /(<[^>]+>)/g

	let match
	let strippedContent = mdxContent

	while ((match = jsxRegex.exec(mdxContent)) !== null) {
		jsxComponents.push(match[0])
		strippedContent = strippedContent.replace(
			match[0],
			`{{jsx:${jsxComponents.length - 1}}}`
		)
	}

	// Get the corresponding path for saving the .md and components.json under translations
	const relativePath = path.relative('content', mdxFilePath) // Get the relative path from content
	const translationsPath = path.join(
		OUTPUT_DIR,
		relativePath.replace('.mdx', '.md')
	) // Save as .md under translations
	const componentsPath = path.join(
		OUTPUT_DIR,
		relativePath.replace('en-US.mdx', 'components.json')
	) // Save the components as components.json under translations

	// Create necessary directories for saving .md and .json files under translations
	const dirPath = path.dirname(translationsPath)
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true })
	}

	// Save the transformed .md file (plain markdown)
	fs.writeFileSync(translationsPath, strippedContent, 'utf-8')

	// Save the components as components.json
	fs.writeFileSync(
		componentsPath,
		JSON.stringify(jsxComponents, null, 2),
		'utf-8'
	)

	console.info(
		`Converted ${mdxFilePath} to ${translationsPath} and ${componentsPath}`
	)
}

// For converting all .mdx to .md and components.json
const rootDirectoryMdx = INPUT_DIR // Root directory to start recursive search for .mdx files
const mdxFiles = getMdxFiles(rootDirectoryMdx)

mdxFiles.forEach((mdxFilePath) => {
	convertMdxToMd(mdxFilePath)
})
