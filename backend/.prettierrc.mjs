/** @type {import('prettier').Config} */

const config = {
	tabWidth: 4,
	semi: false,
	useTabs: true,
	printWidth: 120,
	singleQuote: true,
	arrowParens: 'avoid',
	jsxSingleQuote: true,
	bracketSameLine: true,
	endOfLine: 'crlf',
	overrides: [{ files: '*.yml', options: { tabWidth: 2 } }],
}

export default config
