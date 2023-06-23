const CDN = 'https://cdn.kernvalley.us/';

export const base = {
	':root': {
		margin: '0',
	},
	body: {
		margin: 0,
		display: 'grid',
		'grid-template-areas': '"header header header" "nav nav nav" "main main sidebar" "footer footer footer"',
		'grid-template-columns': '1fr 1fr 250px',
		'grid-template-rows': 'calc(100dvh - 3rem) 3rem 1fr minmax(45vh, auto)',
	},
	'#header': {
		'grid-area': 'header',
		'background-image': `url(${new URL('/css/core-css/neon.svg', CDN)})`,
		'background-fit': 'cover',
	},
	'#nav': {
		'grid-area': 'nav',
		position: 'sticky',
		top: '0',
		'background-color': 'red',
	},
	'#main': {
		'grid-area': 'main',
	},
	'#sidebar': {
		'grid-area': 'sidebar',
	},
	'#footer': {
		'grid-area': 'footer',
		'& github-user': {
			'transform': 'scale(2)'
		}
	},
	'@media (prefers-color-scheme: dark)': {
		'#main': {
			color: 'red',
		},
		'@supports (display: block)': {
			'#main': { background: 'white' }
		}
	}
};
