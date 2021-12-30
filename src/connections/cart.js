import axios from 'axios';
import { uri, currUri } from '.';
const createOptions = (token) => {
	return {
		headers: {
			token: token,
		},
	};
};
export async function getUserCart(userID, token) {
	try {
		const { data } = await axios.get(currUri + `/cart?userID=${userID}`, createOptions(token));
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function getVisitorCart(cartID) {
	try {
		const { data } = await axios.get(currUri + `/cart?cartID=${cartID}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function createCart() {
	try {
		const { data } = await axios.post(currUri + `/cart/create`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function changeUserQty(userID, token, itemID, qty) {
	try {
		const { data } = await axios.post(currUri + `/cart/changeqty?userID=${userID}&itemID=${itemID}&qty=${qty}`, {}, createOptions(token));
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function changeVisitorQty(cartID, itemID, qty) {
	try {
		const { data } = await axios.post(currUri + `/cart/changeqty?cartID=${cartID}&itemID=${itemID}&qty=${qty}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}

export async function addItemToUserCart(userID, token, itemID) {
	try {
		const { data } = await axios.post(currUri + `/cart/additem?userID=${userID}&itemID=${itemID}`, {}, createOptions(token));
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function addItemToVisitorCart(cartID, itemID) {
	try {
		const { data } = await axios.post(currUri + `/cart/additem?cartID=${cartID}&itemID=${itemID}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}

export async function deleteItemToUserCart(userID, token, itemID) {
	try {
		const { data } = await axios.delete(currUri + `/cart/deleteitem?userID=${userID}&itemID=${itemID}`, createOptions(token));
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function deleteItemToVisitorCart(cartID, itemID) {
	try {
		const { data } = await axios.delete(currUri + `/cart/deleteitem?cartID=${cartID}&itemID=${itemID}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function deleteAllItemsToUserCart(userID, token, itemID) {
	try {
		const { data } = await axios.delete(currUri + `/cart/deleteall?userID=${userID}&itemID=${itemID}`, createOptions(token));
		return data;
	} catch (err) {
		return { valid: false };
	}
}
export async function deleteAllItemsToVisitorCart(cartID, itemID) {
	try {
		const { data } = await axios.delete(currUri + `/cart/deleteall?cartID=${cartID}&itemID=${itemID}`);
		return data;
	} catch (err) {
		return { valid: false };
	}
}
