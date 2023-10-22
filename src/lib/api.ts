import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

interface SendOptions {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
	data?: any;
	token?: string;
}

async function send({ method, path, data, token }: SendOptions): Promise<any> {
	const headers = new Headers();
	const opts: RequestInit = { method, headers };

	if (data) {
		headers.set('Content-Type', 'application/json');
		opts.body = JSON.stringify(data);
	}

	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	const res = await fetch(`${PUBLIC_API_URL}/${path}`, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function get(path: string, token?: string): Promise<any> {
	return send({ method: 'GET', path, token });
}

export function del(path: string, token?: string): Promise<any> {
	return send({ method: 'DELETE', path, token });
}

export function post(path: string, data: any, token?: string): Promise<any> {
	return send({ method: 'POST', path, data, token });
}

export function put(path: string, data: any, token?: string): Promise<any> {
	return send({ method: 'PUT', path, data, token });
}
