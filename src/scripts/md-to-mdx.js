const fs = require('fs')
const path = require('path')

const INPUT_DIR = '__translations__'
const OUTPUT_DIR = 'content'

// Convert .md to .mdx (re-insert JSX components)
function convertMdToMdx(mdFilePath) {
	const mdContent = fs.readFileSync(mdFilePath, 'utf-8')

	// Get the corresponding components.json file in translations
	const relativePath = path.relative(INPUT_DIR, mdFilePath) // Get relative path from translations
	const componentsFilePath = path.join(
		INPUT_DIR,
		path.dirname(relativePath),
		'components.json'
	)

	// Check if components.json file exists
	if (!fs.existsSync(componentsFilePath)) {
		console.error(`No components file found for ${mdFilePath}`)
		return
	}

	const jsxComponents = JSON.parse(fs.readFileSync(componentsFilePath, 'utf-8'))

	// Replace placeholders ({{jsx:index}}) with actual JSX components from components.json
	let mdxContent = mdContent.replace(/{{jsx:(\d+)}}/g, (_, index) => {
		const jsxComponent = jsxComponents[parseInt(index, 10)]
		return jsxComponent || ''
	})

	// Get the original path for saving the .mdx file under content
	const contentFilePath = path.join(
		OUTPUT_DIR,
		relativePath.replace('.md', '.mdx')
	)

	// Create necessary directories for saving .mdx file under content
	const dirPath = path.dirname(contentFilePath)
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true })
	}

	// Write the final .mdx content back to the content directory
	fs.writeFileSync(contentFilePath, mdxContent, 'utf-8')

	console.info(`Converted ${mdFilePath} to ${contentFilePath}`)
}

// For converting all .md to .mdx (reverse conversion)
function getMdFiles(dir) {
	let results = []
	const list = fs.readdirSync(dir)

	list.forEach((file) => {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		if (stat && stat.isDirectory()) {
			results = results.concat(getMdFiles(filePath)) // Recursive call for subdirectories
		} else if (filePath.endsWith('.md') && !filePath.includes('en-US.md')) {
			results.push(filePath)
		}
	})

	return results
}

const rootDirectoryMd = `./${INPUT_DIR}` // Root directory to start recursive search for .md files
const mdFiles = getMdFiles(rootDirectoryMd)

mdFiles.forEach((mdFilePath) => {
	convertMdToMdx(mdFilePath)
})
