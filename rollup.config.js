import { getConfig } from '@shgysk8zer0/js-utils/rollup';

export default getConfig('./swagger.js', {
	format: 'cjs',
	minify: false,
	sourcemap: false,
	external: [],
	plugins: [],
	globals: {},
});
