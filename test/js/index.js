import '@shgysk8zer0/polyfills';
import '@shgysk8zer0/components/bacon-ipsum.js';
import '@shgysk8zer0/components/github/user.js';
import { konami } from '@shgysk8zer0/konami';
import * as Swagger from '@shgysk8zer0/jswaggersheets';
import { base, footerStyles } from './styles.js';

const sheet = Swagger.createSheet(footerStyles);

Swagger.setStyle(document, base);
Swagger.addStyle(document, {
	'.card': {
		display: 'inline-block',
		border: '1px solid #dadada',
	}
}, { media: 'screen', baseURL: document.baseURL });

const footer = document.getElementById('footer');
footer.attachShadow({ mode: 'open' });
footer.shadowRoot.append(...footer.children);
Swagger.adoptSheet(footer, sheet);

konami().then(() => {
	Swagger.addStyle(document.documentElement, {
		'body': { filter: 'invert(1)' }
	});
});
