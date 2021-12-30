import axios from 'axios';
import { uri, currUri } from '.';

export async function getProductsByCategory(name) {
	try {
		const { data } = await axios.get(currUri + `/item/category?category=${name}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function getProductsBySearch(text) {
	try {
		const { data } = await axios.get(currUri + `/item/search?query=${text}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}
