const CDN = 'https://cdn.kernvalley.us/';

export const base = {
	':root': {
		margin: '0',
		'scrollbar-color': '#c40707 rgba(0, 0, 0, 0.7)',
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
		'-webkit-backdrop-filter': 'blur(3px)',
		'backdrop-filter': 'blur(7px)',
		'background-color': '#c40707aa',
		'font-size': '1.2em',
		gap: '5px',
		'grid-area': 'nav',
		'display': 'flex',
		'position': 'sticky',
		top: 0,
	},
	'#main': {
		'grid-area': 'main',
	},
	'#sidebar': {
		'grid-area': 'sidebar',
	},
	'#footer': {
		'grid-area': 'footer',
	},
};

export const footerStyles = {
	':host': {
		'background-color': '#232323',
		'border-top': '1px solid #dadada',
		'padding': '1.3em',
	},
};
