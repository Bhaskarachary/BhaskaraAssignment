module.exports = {
	extends: ["standard", "standard-react"],
	plugins: [
		'react',
		'jsx-a11y',
		'import'
	],
	rules: {
		'indent': ['error', 'tab'], //Always use tabs for indentation
		'semi': ['error', 'always'], //Always use semicolons at the end of the statement
		'jsx-quotes': ['error', 'prefer-double'],
		'one-var': 'off',
		'no-tabs': 0, //Tab character is allowed
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'max-len': [1, 120, 2, {ignoreComments: true}], //Max 120 characters allowed in a line,
		'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }]
	},
	env: {
		browser: true,
		jest: true
	},
};
