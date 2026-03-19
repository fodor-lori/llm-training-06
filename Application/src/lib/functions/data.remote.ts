import { command, form, query } from '$app/server';
import { API_BASE_URL } from '$env/static/private';
import * as v from 'valibot';

export const getProducts = query(async () => {
	const result = await fetch(`${API_BASE_URL}/products`);
	const data = await result.json();
	return data;
});

export const createProduct = form(async (data) => {
	const name = data.get('name') as string;
	const description = data.get('description') as string;
	const price = parseFloat(data.get('price') as string);
	const stock = parseInt((data.get('stock') as string) || '0', 10);

	const result = await fetch(`${API_BASE_URL}/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, description, price, stock })
	});

	if (!result.ok) {
		throw new Error('Failed to create product');
	}

	return result.json();
});

export const updateProduct = form(async (data) => {
	const id = parseInt(data.get('id') as string, 10);

	const payload: Record<string, unknown> = {};
	if (data.has('name')) payload.name = data.get('name');
	if (data.has('description')) payload.description = data.get('description');
	if (data.has('price')) payload.price = parseFloat(data.get('price') as string);
	if (data.has('stock')) payload.stock = parseInt((data.get('stock') as string) || '0', 10);

	const result = await fetch(`${API_BASE_URL}/products/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (!result.ok) {
		throw new Error('Failed to update product');
	}

	return result.json();
});

export const getProduct = query(v.number(), async (id) => {
	const result = await fetch(`${API_BASE_URL}/products/${id}`);

	if (!result.ok) {
		throw new Error('Failed to fetch product');
	}

	return result.json();
});

export const deleteProduct = command(v.number(), async (id) => {
	const result = await fetch(`${API_BASE_URL}/products/${id}`, {
		method: 'DELETE'
	});

	if (!result.ok) {
		throw new Error('Failed to delete product');
	}
});

export const getCart = query(async () => {
	const result = await fetch(`${API_BASE_URL}/cart`);

	if (!result.ok) {
		throw new Error('Failed to fetch cart');
	}
	const data = await result.json();
	return data;
});

export const addToCart = command(v.number(), async (productId) => {
	const result = await fetch(`${API_BASE_URL}/cart/${productId}`, {
		method: 'POST'
	});

	if (!result.ok) {
		const error = await result.json();
		throw new Error(error.detail || 'Failed to add to cart');
	}

	return result.json();
});

export const removeFromCart = command(v.number(), async (productId) => {
	const result = await fetch(`${API_BASE_URL}/cart/${productId}`, {
		method: 'DELETE'
	});

	if (!result.ok) {
		throw new Error('Failed to remove from cart');
	}
});
