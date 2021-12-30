import axios from 'axios';
import { uri, currUri } from '.';
const createOptions = (token) => {
	return {
		headers: {
			token: token,
		},
	};
};

export async function getUser(userID, token) {
	try {
		const { data } = await axios.get(currUri + `/user?userID=${userID}`, createOptions(token));
		return data;
	} catch (err) {
		return { valid: false };
	}
}

export async function login(email, pwd) {
	try {
		const { data } = await axios.post(currUri + `/user/login?email=${email}&password=${pwd}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function signUp(firstName, lastName, email, pwd) {
	try {
		const { data } = await axios.post(currUri + `/user/register?email=${email}&password=${pwd}&firstName=${firstName}&lastName=${lastName}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}
