import './App.css';
import {Landing , SignUp , Login , Cart} from './pages'
import { Navbar , Snackbar } from './components';
import {Overlay} from './HOC'
import { Routes, Route } from 'react-router-dom';
import {useContext } from 'react';
import useGlobal from './hooks/useGlobal';
import { GlobalContext } from './store/GlobalProvider';

function App() {
	const {  overlayComponent, categoriesOpen, setCategoriesOpen, overlay, setOverlayOpen , snackbar , setSnackbar, snackbarText , snackbarType } = useContext(GlobalContext);
	const [onSignin, onSignout , onAddToCart , onDeleteFromCart , onDeleteAllFromCart , onChangeQty] = useGlobal();

	//global click
	const handleGlobalClick = (e) => {
		const classes = Array.from(e.target.classList);
		if(!classes.includes("categories")){
			setCategoriesOpen(false);
		}
		setSnackbar(false);
	};

	//categoreis modal
	const onCategories = () => {
		setOverlayOpen(false);
		setCategoriesOpen(!categoriesOpen);
	};

	return (
		<div onClick={handleGlobalClick} className="App bg-slate-200 relative">
			<Overlay  on={overlay} component={overlayComponent}/>
			<Snackbar on = {snackbar} msg = {snackbarText} type = {snackbarType}/>
			<div className="relative">
				<Navbar onCategories={onCategories} onSignout={() => onSignout()} />										
				<Routes>
					<Route element={<Login onSignin={(user, token) => onSignin(user, token)} />} path="login" />
					<Route element={<SignUp onSignin={(user, token) => onSignin(user, token)} />} path="signup" />
					<Route element={<Landing onCategories={onCategories} onAddToCart = {onAddToCart}/>} path="/" />
					<Route element={<Login />} path="login" />
					<Route element={<Cart onAddToCart={onAddToCart} onDeleteFromCart={onDeleteFromCart} onDeleteAllFromCart = {onDeleteAllFromCart} onChangeQty={onChangeQty} />} path="cart" />
				</Routes>
			</div>
		</div>
	);
}

export default App;
