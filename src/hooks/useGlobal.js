import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { addItemToUserCart, addItemToVisitorCart, changeUserQty, changeVisitorQty, createCart, deleteAllItemsToUserCart, deleteAllItemsToVisitorCart, deleteItemToUserCart, deleteItemToVisitorCart, getUserCart, getVisitorCart } from '../connections/cart';
import { getCategories } from '../connections/category';
import { getUser } from '../connections/user';
import { GlobalContext } from '../store/GlobalProvider';
export default function useGlobal() {
	const [cookies, setCookie , removeCookie] = useCookies(['auth', 'user', 'token', 'cart']);
	const { auth, user, token, cart: cartID } = cookies;
	const {setLoading, setCategories, setCategory, setCategoriesErr, globalUpdate : update , setWidth: setGlobalWidth, setCart, setCartErr , setSnackbar , setSnackbarText , setSnackbarType} = useContext(GlobalContext);
	const setWidth = () => {
		setGlobalWidth(window.innerWidth);
	};

	useEffect(() => {
		const getGlobal = async () => {
			setLoading(true);
			const { categories, valid } = await getCategories();
			if (valid) {
				await setCategories(categories);
				await setCategory(categories[0]);
				setCategoriesErr(false);
			} else {
				setCategoriesErr(true);
				setSnackbarText('Something went wrong check your internet connection');
				setSnackbarType('err');
				setSnackbar(true);
				setTimeout(() =>{
					setSnackbar(false);
				} , 3000)
				setLoading(false);
				setCartErr("Connection Failed")
				return;
			}

			if (auth) {
				const {valid } = await getUser(user._id, token);
				if (!valid) {
					onSignout();
					return;
				} else {
					const { cart, valid } = await getUserCart(user._id, token);
					if (valid) {
						setCart(cart);
						setCartErr(false);
					} else {
						setCartErr('Something went wrong check your internet connection');
					}
				}
			} else {
				if (cartID) {
					const { cart, valid } = await getVisitorCart(cartID);
					if (valid) {
						setCart(cart);
						setCartErr(false);
					} else setCartErr('Something went wrong check your internet connection');
				} else {
					const { cart } = await createCart();
					setCookie('cart', cart._id);
					setCart(cart);
					setCartErr(false);
				}
			}

			setLoading(false);
		};
		getGlobal();
		window.addEventListener('resize', setWidth);
	}, [update]);

	//user signing out
	const onSignout = () => {
		removeCookie('auth');
		removeCookie('user');
		removeCookie('token');
		window.location.reload(true);
	};

	//user signing in
	const onSignin = (user, token) => {
		setCookie('auth', true);
		setCookie('user', user);
		setCookie('token', token);
		window.location.reload(true);
	};
	
	//user adding item to cart
	const onAddToCart = async (itemID) =>{
		//if authenticated
		let valid = false;
		if(auth){
			const {valid : v} = await addItemToUserCart(user._id , token , itemID);
			valid = v;
		}//else
		else{
			const {valid : v} = await addItemToVisitorCart(cartID , itemID)
			valid = v;
		}
		return valid;
	}
	//user deleting  item from cart
	const onDeleteFromCart = async (itemID) =>{
		//if authenticated
		let valid = false;
		if(auth){
			const {valid : v} = await deleteItemToUserCart(user._id , token , itemID);
			valid = v;
		}//else
		else{
			const {valid : v} = await deleteItemToVisitorCart(cartID , itemID)
			valid = v;
		}
		return valid;
	}

	//user deleting  item from cart
	const onDeleteAllFromCart = async () =>{
		//if authenticated
		let valid = false;
		if(auth){
			const {valid : v} = await deleteAllItemsToUserCart(user._id , token);
			valid = v;
		}//else
		else{
			const {valid : v} = await deleteAllItemsToVisitorCart(cartID)
			valid = v;
		}
		return valid;
	}

	//user changing qty
	const onChangeQty = async (itemID , qty) =>{
		if(qty === 0){
			onDeleteFromCart(itemID);
			return;
		}else if(qty === -1) return;
		//if authenticated
		let valid = false;
		if(auth){
			const {valid : v} = await changeUserQty(user._id , token , itemID , qty);
			valid = v;
		}//else
		else{
			const {valid : v} = await changeVisitorQty(cartID , itemID , qty)
			valid = v;
		}
		return valid;
	}
	return [onSignin, onSignout , onAddToCart , onDeleteFromCart , onDeleteAllFromCart , onChangeQty];
}
