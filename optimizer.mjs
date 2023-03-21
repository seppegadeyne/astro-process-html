/*
Optimize HTML files for better performance by:
    * Adding IDs to h2, h3, and h4 tags
    * Minifying the HTML
This script is run automatically by Vercel during site deployment
Developed by Straffe Sites - https://straffesites.com/en
*/

import fs from 'node:fs/promises'
import { globby } from 'globby'
import { minify } from 'html-minifier'
import { JSDOM } from 'jsdom'

console.log('Optimizing HTML files for better performance...')

// Get all HTML files from the output directory
const distPath = './.vercel/output/static'
const files = await globby(`${distPath}/**/*.html`)

await Promise.all(
	files.map(async (file) => {
		console.log('Processing file:', file)
		let html = await fs.readFile(file, 'utf-8')

		// Add IDs to h2, h3, and h4 tags
		const dom = new JSDOM(html)
		const headings = dom.window.document.querySelectorAll('h1, h2, h3, h4')
		for (let i = 0; i < headings.length; i++) {
			const heading = headings[i]
			const text = heading.textContent
			const id = text
				.trim()
				.replace(/[\s.,?:]+/g, '-')
				.replace(/-+$/, '')
				.toLowerCase()
			heading.setAttribute('id', id)
		}
		html = dom.serialize()

		// Minify the HTML
		html = minify(html, {
			removeComments: true,
			preserveLineBreaks: true,
			collapseWhitespace: true
		})
		await fs.writeFile(file, html)
	})
)
