import axios from 'axios';
import { uri, currUri } from '.';
export async function getCategories() {
	try {
		const { data } = await axios.get(currUri + '/category/all');
		return data;
	} catch (err) {
		return { valid: false, categories: false };
	}
}
