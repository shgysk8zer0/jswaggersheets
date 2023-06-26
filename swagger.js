/**
 * JSwaggerSheets
 *
 * A CSS-in-JS / CSS Modules library that leverages constructable stylesheets and adopted stylesheets.
 * Provides a minimal and lightweight solution for defining styles using JavaScript objects and applying them to the DOM.
 *
 * @version 1.0.4
 * @copyright 2023 Chris Zuber <admin@kernvalley.us>
 * @license MIT
 * @see {@link https://github.com/shgysk8zer0/jswaggersheets} for the full documentation, examples, and usage details.
 */

/**
 * Converts a JavaScript object into a CSS string.
 *
 * @todo Support CSS Nesting, media queries, etc
 * @param {Object} obj - The object representing CSS rules.
 * @param {string} [id=''] - Optional ID prefix to add to selectors.
 * @returns {string} - The generated CSS string.
 */
function stringifyRules(obj, id = '') {
	if (typeof id === 'string' && id.length !== 0) {
		return Object.entries(obj).map(([selector, rule]) => {
			return `#${id} ${selector} {${Object.entries(rule).map(([key, val]) => `${key}:${val};`).join('')}}`;
		}).join('');
	} else {
		return Object.entries(obj).map(([selector, rule]) => {
			return `${selector} {${Object.entries(rule).map(([key, val]) => `${key}:${val};`).join('')}}`;
		}).join('');
	}
}

/**
 * Generates a unique ID for scoping CSS selectors.
 *
 * @returns {string} - The generated unique ID.
 */
function generateId() {
	return `_scoped_${crypto.randomUUID().replaceAll('-', '')}`;
}

/**
 * Creates a CSSStyleSheet based on the provided rules and options.
 *
 * @param {Object} rules - An object containing CSS selectors and corresponding styles.
 * @param {Object} options - Optional settings for the stylesheet.
 * @param {string} options.media - The media query for which the styles should apply.
 * @param {boolean} options.disabled - Determines if the stylesheet should be initially disabled.
 * @param {string} options.baseURL - The base URL to resolve relative URLs in the styles.
 * @param {HTMLElement|string} options.target - The target element or a CSS selector for the target element.
 * @returns {Promise<CSSStyleSheet>} - A promise that resolves to the created CSSStyleSheet object.
 */
export async function createSheet(rules, { media, disabled, baseURL, target } = {}) {
	if (typeof target === 'string') {
		return createSheet(rules, { media, disabled, baseURL, target: document.querySelector(target) });
	} else {
		const hasShadow = target instanceof Element && ! Object.is(target.shadowRoot, null);
		if (target instanceof Element && target.id.length === 0 && ! hasShadow) {
			target.id = generateId();
		}

		const sheet = new CSSStyleSheet({ media, disabled, baseURL });
		const css = stringifyRules(rules, target instanceof Element && ! hasShadow ? target.id : null);
		await sheet.replace(css);
		return sheet;
	}
}

/**
 * Adopts the provided CSSStyleSheet(s) into the specified target element or its shadow DOM.
 *
 * @param {HTMLElement|ShadowRoot|string} target - The target element or a CSS selector for the target element.
 * @param {...CSSStyleSheet} sheets - The CSSStyleSheet(s) to be adopted.
 */
export async function adoptSheets(target, ...sheets) {
	if (typeof target === 'string') {
		await adoptSheets(document.querySelector(target), ...sheets);
	} else if (! (target instanceof Node)) {
		throw new TypeError('Target must be a Document, Element, or ShadowRoot.');
	} else if ('adoptedStyleSheets' in target) {
		target.adoptedStyleSheets = await Promise.all(sheets);
	} else if (
		'shadowRoot' in target
		&& ! Object.is(target.shadowRoot, null)
		&& 'adoptedStyleSheets' in target.shadowRoot
	) {
		target.shadowRoot.adoptedStyleSheets = await Promise.all(sheets);
	} else if (target instanceof Element) {
		await adoptSheets(target.ownerDocument, ...sheets);
	}
}

/**
 * Adopts the provided CSSStyleSheet into the specified target element or its owner document/shadow DOM.
 *
 * @param {HTMLElement|Document|ShadowRoot} target - The target element, document, or shadow DOM to adopt the stylesheet into.
 * @param {CSSStyleSheet} sheet - The CSSStyleSheet to be adopted.
 * @param {Object} options - Optional settings for adopting the stylesheet.
 * @param {boolean} options.replace - Determines whether to replace existing stylesheets or append the new one.
 */
export async function adoptSheet(target, sheet, { replace = true } = {}) {
	if (replace) {
		await adoptSheets(target, sheet);
	} else if (target instanceof Document || target instanceof ShadowRoot) {
		await adoptSheets(target, ...target.adoptedStyleSheets, sheet);
	} else {
		await adoptSheets(target.ownerDocument, ...target.ownerDocument.adoptedStyleSheets, sheet);
	}
}

/**
 * Sets/replaces styles for a given CSS selector using constructable stylesheets.
 *
 * @param {HTMLElement|ShadowRoot|string} target - The Element or Shadow or CSS selector to apply the styles to.
 * @param {Object} rules - An object containing CSS properties and values.
 * @param {Object} options - Optional settings for the styles.
 * @returns {CSSStyleSheet} - The created CSSStyleSheet object.
 */
export async function setStyle(target, rules, { media, disabled, baseURL } = {}) {
	const sheet = await createSheet(rules, { media, disabled, baseURL, target });
	await adoptSheet(target, sheet, { replace: true });
	return sheet;
}

/**
 * Adds styles to the specified target element using the provided rules.
 *
 * @param {HTMLElement|ShadowRoot|string} target - The target element to apply the styles to.
 * @param {Object} rules - An object containing CSS selectors and corresponding styles.
 * @param {Object} options - Optional settings for the styles.
 * @param {string} options.media - The media query for which the styles should apply.
 * @param {boolean} options.disabled - Determines if the styles should be initially disabled.
 * @param {string} options.baseURL - The base URL to resolve relative URLs in the styles.
 * @returns {CSSStyleSheet} - The created CSSStyleSheet object.
 */
export async function addStyle(target, rules, { media, disabled, baseURL } = {}) {
	const sheet = await createSheet(rules, { media, disabled, baseURL, target });
	await adoptSheet(target, sheet, { replace: false });
	return sheet;
}

/**
 * Converts a CSSStyleSheet into a File object.
 *
 * @param {CSSStyleSheet} sheet - The CSSStyleSheet to convert.
 * @param {string} name - The name of the file. Default is 'styles.css'.
 * @returns {File} - The created File object.
 */
export function sheetToFile(sheet, name = 'styles.css') {
	const css = [...sheet.cssRules].map(rule => rule.cssText).join('');
	return new File([css], name, { type: 'text/css' });
}
