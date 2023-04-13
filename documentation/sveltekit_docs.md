## +server

As well as pages, you can define routes with a `+server.js` file (sometimes referred to as an 'API route' or an 'endpoint'), which gives you full control over the response. Your `+server.js` file (or `+server.ts`) exports functions corresponding to HTTP verbs like `GET`, `POST`, `PATCH`, `PUT`, `DELETE`, and `OPTIONS` that take a `RequestEvent` argument and return a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

For example we could create an `/api/random-number` route with a `GET` handler:

```js
/// file: src/routes/api/random-number/+server.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const min = Number(url.searchParams.get('min') ?? '0');
	const max = Number(url.searchParams.get('max') ?? '1');

	const d = max - min;

	if (isNaN(d) || d < 0) {
		throw error(400, 'min and max must be numbers, and min must be less than max');
	}

	const random = min + Math.random() * d;

	return new Response(String(random));
}
```

The first argument to `Response` can be a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), making it possible to stream large amounts of data or create server-sent events (unless deploying to platforms that buffer responses, like AWS Lambda).

You can use the [`error`](modules#sveltejs-kit-error), [`redirect`](modules#sveltejs-kit-redirect) and [`json`](modules#sveltejs-kit-json) methods from `@sveltejs/kit` for convenience (but you don't have to).

If an error is thrown (either `throw error(...)` or an unexpected error), the response will be a JSON representation of the error or a fallback error page — which can be customised via `src/error.html` — depending on the `Accept` header. The [`+error.svelte`](#error) component will _not_ be rendered in this case. You can read more about error handling [here](errors).

> When creating an `OPTIONS` handler, note that Vite will inject `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers — these will not be present in production unless you add them.

### Receiving data

By exporting `POST`/`PUT`/`PATCH`/`DELETE`/`OPTIONS` handlers, `+server.js` files can be used to create a complete API:

```svelte
/// file: src/routes/add/+page.svelte
<script>
	let a = 0;
	let b = 0;
	let total = 0;

	async function add() {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ a, b }),
			headers: {
				'content-type': 'application/json'
			}
		});

		total = await response.json();
	}
</script>

<input type="number" bind:value={a}> +
<input type="number" bind:value={b}> =
{total}

<button on:click={add}>Calculate</button>
```

```js
/// file: src/routes/api/add/+server.js
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { a, b } = await request.json();
	return json(a + b);
}
```

> In general, [form actions](form-actions) are a better way to submit data from the browser to the server.

### Content negotiation

`+server.js` files can be placed in the same directory as `+page` files, allowing the same route to be either a page or an API endpoint. To determine which, SvelteKit applies the following rules:

- `PUT`/`PATCH`/`DELETE`/`OPTIONS` requests are always handled by `+server.js` since they do not apply to pages
- `GET`/`POST` requests are treated as page requests if the `accept` header prioritises `text/html` (in other words, it's a browser page request), else they are handled by `+server.js`