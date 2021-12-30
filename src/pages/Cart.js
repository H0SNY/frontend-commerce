import { useContext } from 'react';
import { Paging } from '../HOC';
import { GlobalContext } from '../store/GlobalProvider';
import { Loading, Modal, ProductPreview } from '../components';

export default function Cart({ onAddToCart, onDeleteFromCart, onDeleteAllFromCart, onChangeQty }) {
	const { cart, cartErr, loading, setOverlay, setOverlayComponent, setSnackbarText, setSnackbar, setSnackbarType, globalUpdate, setGlobalUpdate } = useContext(GlobalContext);

	const renderProduct = (product) => {
		return <ProductPreview key={Math.random() * 780000} onAddToCart={onAddToCart} onDeleteFromCart={onDeleteFromCart} onChangeQty={onChangeQty} product={product.item} qty={product.qty} loading={loading} />;
	};
	const handleDeleteAll = async () => {
		const valid = await onDeleteAllFromCart();
		if (valid) {
			setSnackbarText('Items Removed Succesfully');
			setSnackbarType('success');
			setSnackbar(true);
		} else {
			setSnackbarText('Failed To Remove Items');
			setSnackbarType('err');
			setSnackbar(true);
		}
		setTimeout(() => {
			setSnackbar(false);
		}, []);
		setGlobalUpdate(!globalUpdate);
		closeModal();
	};
	const openModal = () => {
		setOverlay(true);
		setOverlayComponent(deleteModalHTML);
	};
	const closeModal = () => {
		setOverlay(false);
		setOverlayComponent(false);
	};
	const deleteModalHTML = <Modal text="Are You Sure You Want To Delete All Items" onRemove={closeModal} onConfirm={handleDeleteAll} />;
	return (
		<div className="w-full h-full">
			<div className={` flex flex-row justify-start pl-12 text-indigo-600 text-2xl pt-3`}>
				<h3>Cart</h3>
			</div>
			{!loading && !cartErr && !cart.items.length ? (
				<div onClick={openModal} className="flex flex-col justify-center items-center m-10">
					<h3>You Didnt Add Items To The Cart</h3>
				</div>
			) : (
				''
			)}

			{!loading && !cartErr ? (
				<>
					{' '}
					<Paging items={cart.items?.map(renderProduct)} itemPerPage={3} />
					<div className="flex flex-row justify-evenly my-10">
						<div>
							<button onClick={openModal} className="p-2 bg-red-800 rounded-lg text-white active:bg-red-600 hover:bg-red-700">
								<h4>Delete All</h4>
							</button>
						</div>
						<div className="flex flex-col justify-center items-center">
							<h4>{cart.totalPrice} $</h4>
						</div>
					</div>
				</>
			) : (
				''
			)}

			{loading ? <Loading color="black" /> : ''}
			{cartErr ? (
				<div className="flex flex-col w-full justify-center items-center">
					{' '}
					<h4>{cartErr}</h4>{' '}
				</div>
			) : (
				''
			)}
		</div>
	);
}
