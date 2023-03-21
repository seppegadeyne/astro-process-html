// Script to optimize HTML files for better performance
// - Add IDs to h2, h3, and h4 tags
// - Replace external stylesheet links with inline styles
// - Minify the HTML
// This script is run automatically by Vercel when deploying the site
// Straffe Sites - https://straffesites.com/en

import fs from 'node:fs/promises'
import { globby } from 'globby'
import { minify } from 'html-minifier'
import { JSDOM } from 'jsdom'

console.log('Optimizing HTML files for better performance by Straffe Sites...')

// Get all HTML files
// Note: This assumes that the output directory is .vercel/output/static
const distPath = './.vercel/output/static'
const files = await globby(`${distPath}/**/*.html`)

await Promise.all(
	files.map(async (file) => {
		console.log('Processing file:', file)
		let html = await fs.readFile(file, 'utf-8')

		// Add IDs to h2, h3, and h4 tags
		const dom = new JSDOM(html)
		const headings = dom.window.document.querySelectorAll('h2, h3, h4')
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

		// Replace external stylesheet links with inline styles
		const stylesheets = html.match(/<link rel="stylesheet" href="(.+?)" \/>/g)
		if (stylesheets?.length > 0) {
			await Promise.all(
				stylesheets.map(async (stylesheet) => {
					const stylePath = stylesheet.match(/^<link rel="stylesheet" href="(.+?)" \/>$/)[1]
					const style = await fs.readFile(distPath + stylePath, 'utf-8')
					html = html.replace(stylesheet, `<style>${style.trim()}</style>`)
				})
			)
		}

		// Minify the HTML
		html = minify(html, {
			removeComments: true,
			preserveLineBreaks: true,
			collapseWhitespace: true
		})
		await fs.writeFile(file, html)
	})
)
