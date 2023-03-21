# Astro Optimization Script

This repository includes an optimization script that improves the performance of your Astro-generated HTML files. The script performs the following tasks:

- Adds IDs to h2, h3, and h4 tags
- Minifies the HTML
- [Live demo at Vercel](https://astro-process-html.vercel.app/)

## Prerequisites

Ensure that you have the following dependencies installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Astro](https://astro.build/) (version 2.1.3 or higher)

## Setup

1. Place the `optimizer.mjs` file in your Astro project's root directory.

2. Update your `package.json` file to include the necessary dependencies and scripts. Your `package.json` should look similar to the one below:

```json
{
	"name": "",
	"type": "module",
	"version": "0.0.1",
	"scripts": {
		"dev": "astro dev",
		"start": "astro dev",
		"build": "astro build && node optimizer.mjs",
		"preview": "astro preview",
		"astro": "astro"
	},
	"devDependencies": {
		"astro": "~2.1.3",
		"@astrojs/vercel": "~3.2.1",
		"globby": "~13.1.3",
		"html-minifier": "~4.0.0",
		"jsdom": "~21.0.0"
	}
}
```

1. Install the dependencies by running the following command: `npm install`.

## Usage

The optimization script will run automatically after building the Astro project. To build and optimize your project, run the following command: `npm run build`. Your HTML files will now be optimized and ready for deployment.

## Development

During development, you can run the Astro development server using the following command: `npm run dev`. This will not run the optimization script, as it is only needed for production builds.

## Preview

To preview your optimized project, run the following command: `npm run preview`. This will serve your optimized production build locally.

## Deployment

For deployment, follow the standard deployment process for Astro projects. The optimization script will run automatically during the build process, so no additional steps are needed.

This README.md file provides a guide for integrating the optimization script into an Astro project, including setup instructions and usage details.
