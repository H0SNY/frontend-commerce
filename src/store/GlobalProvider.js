import { useReducer } from 'react';
import { SET_LOADING, SET_USER, SET_CATEGORIES, SET_CATEGORY, SET_WIDTH, SET_ACCOUNT_OPEN, SET_CATEGORIES_OPEN, SET_OVERLAY, SET_PRODUCTS, SET_PRODUCTS_PAGE, SET_PRODUCTS_TYPE, SET_LOGIN_OPEN, SET_SIGNUP_OPEN, SET_QUERY, SET_MAIN_OPEN, SET_PRODUCTS_ERR, SET_CATEGORIES_ERR, SET_CART_ERR, SET_CART, SET_OVERLAY_COMPONENT, SET_GLOBAL_UPDATE, SET_SNACKBAR, SET_SNACKBAR_TEXT, SET_SNACKBAR_TYPE } from '../assets/globalHelpers';
import React from 'react';

const initialState = {
	categories: [],
	category: {},
	loading: true,
	width: window.innerWidth,
	categoriesOpen: false,
	overlay: false,
	products: {
		value: [],
		length: 0,
		totalPages: 0,
		page: 1,
		type: 'category',
	},
	cart: {
		items : [] , 
		totalPrice : 0 , 
	},
	query: '',
	mainOpen: true,
	categoriesErr: false,
	productsErr: false,
	cartErr: false,
	overlayComponent: false,
	updateGlobal: false,
	snackbar: false,
	snackbarText: false,
	snackbarType: false,
};

export const GlobalContext = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.user,
			};
		case SET_CATEGORIES:
			return {
				...state,
				categories: action.categories,
			};
		case SET_LOADING:
			return {
				...state,
				loading: action.loading,
			};
		case SET_CATEGORY:
			return {
				...state,
				category: action.category,
			};
		case SET_WIDTH:
			return {
				...state,
				width: action.width,
			};
		case SET_CATEGORIES_OPEN:
			return {
				...state,
				categoriesOpen: action.categoriesOpen,
			};
		case SET_ACCOUNT_OPEN:
			return {
				...state,
				accountOpen: action.accountOpen,
			};
		case SET_LOGIN_OPEN:
			return {
				...state,
				loginOpen: action.loginOpen,
			};
		case SET_SIGNUP_OPEN:
			return {
				...state,
				signupOpen: action.signupOpen,
			};
		case SET_OVERLAY:
			return {
				...state,
				overlay: action.overlay,
			};
		case SET_QUERY:
			return {
				...state,
				query: action.query,
			};
		case SET_PRODUCTS:
			return {
				...state,
				products: {
					value: action.products,
					length: action.products.length,
					page: 1,
					totalPages: Math.ceil(action.products.length / 3),
				},
			};
		case SET_PRODUCTS_PAGE:
			return {
				...state,
				products: {
					...state.products,
					page: action.page,
				},
			};
		case SET_PRODUCTS_TYPE:
			return {
				...state,
				products: {
					...state.products,
					type: action.productType,
				},
			};
		case SET_MAIN_OPEN:
			return {
				...state,
				mainOpen: action.mainOpen,
			};
		case SET_PRODUCTS_ERR:
			return {
				...state,
				productsErr: action.productsErr,
			};
		case SET_CATEGORIES_ERR:
			return {
				...state,
				categoriesErr: action.categoriesErr,
			};
		case SET_CART_ERR:
			return {
				...state,
				cartErr: action.cartErr,
			};
		case SET_CART:
			return {
				...state,
				cart: action.cart,
			};
		case SET_OVERLAY_COMPONENT:
			return {
				...state,
				overlayComponent: action.overlayComponent,
			};
		case SET_GLOBAL_UPDATE:
			return {
				...state,
				globalUpdate: action.globalUpdate,
			};
		case SET_SNACKBAR:
			return {
				...state,
				snackbar: action.snackbar,
			};
		case SET_SNACKBAR_TEXT:
			return {
				...state,
				snackbarText: action.snackbarText,
			};
		case SET_SNACKBAR_TYPE:
			return {
				...state,
				snackbarType: action.snackbarType,
			};

		default:
			return { ...state };
	}
};

export default function GlobalProvider({ children }) {
	const [store, dispatchStore] = useReducer(reducer, {
		...initialState,
		setUser(user) {
			dispatchStore({ type: SET_USER, user: user });
		},
		setCategories(categories) {
			dispatchStore({ type: SET_CATEGORIES, categories: categories });
		},
		setLoading(loading) {
			dispatchStore({ type: SET_LOADING, loading: loading });
		},
		setCategory(category) {
			dispatchStore({ type: SET_CATEGORY, category: category });
		},
		setWidth(width) {
			dispatchStore({ type: SET_WIDTH, width: width });
		},
		setCategoriesOpen(categoriesOpen) {
			dispatchStore({ type: SET_CATEGORIES_OPEN, categoriesOpen: categoriesOpen });
		},
		setAccountOpen(accountOpen) {
			dispatchStore({ type: SET_ACCOUNT_OPEN, accountOpen: accountOpen });
		},
		setLoginOpen(loginOpen) {
			dispatchStore({ type: SET_LOGIN_OPEN, loginOpen: loginOpen });
		},
		setSignupOpen(signupOpen) {
			dispatchStore({ type: SET_SIGNUP_OPEN, signupOpen: signupOpen });
		},
		setOverlay(overlay) {
			dispatchStore({ type: SET_OVERLAY, overlay: overlay });
		},
		setProducts(products) {
			dispatchStore({ type: SET_PRODUCTS, products: products });
		},
		setProductsPage(page) {
			dispatchStore({ type: SET_PRODUCTS_PAGE, page: page });
		},
		setProductsType(productType) {
			dispatchStore({ type: SET_PRODUCTS_TYPE, productType: productType });
		},
		setQuery(query) {
			dispatchStore({ type: SET_QUERY, query: query });
		},
		setMainOpen(mainOpen) {
			dispatchStore({ type: SET_MAIN_OPEN, mainOpen: mainOpen });
		},
		setCategoriesErr(categoriesErr) {
			dispatchStore({ type: SET_CATEGORIES_ERR, categoriesErr: categoriesErr });
		},
		setProductsErr(productsErr) {
			dispatchStore({ type: SET_PRODUCTS_ERR, productsErr: productsErr });
		},
		setCartErr(cartErr) {
			dispatchStore({ type: SET_CART_ERR, cartErr: cartErr });
		},
		setCart(cart) {
			dispatchStore({ type: SET_CART, cart: cart });
		},
		setOverlayComponent(overlayComponent) {
			dispatchStore({ type: SET_OVERLAY_COMPONENT, overlayComponent: overlayComponent });
		},
		setGlobalUpdate(globalUpdate) {
			dispatchStore({ type: SET_GLOBAL_UPDATE, globalUpdate: globalUpdate });
		},
		setSnackbar(snackbar) {
			dispatchStore({ type: SET_SNACKBAR, snackbar: snackbar });
		},
		setSnackbarText(snackbarText) {
			dispatchStore({ type: SET_SNACKBAR_TEXT, snackbarText: snackbarText });
		},
		setSnackbarType(snackbarType) {
			dispatchStore({ type: SET_SNACKBAR_TYPE, snackbarType: snackbarType });
		},
	});

	return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>;
}
