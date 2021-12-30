import { AiFillDelete } from 'react-icons/ai';
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalProvider';
import {Modal , Rating} from '.';
export default function ProductPreview({ product, loading, qty, onChangeQty, onAddToCart, onDeleteFromCart }) {
	const { id, description, image, title, rating, price } = product;
	const { setOverlay, setOverlayComponent, setGlobalUpdate, globalUpdate , setSnackbar , setSnackbarText , setSnackbarType } = useContext(GlobalContext);
	const handleAddToCart = async () => {
		const valid = await onAddToCart(id);
		if (valid) {
			setSnackbarText("Item Added Succesfully");
			setSnackbarType("success");
			setSnackbar(true);
		}else{
			setSnackbarText("Failed To Add Item");
			setSnackbarType("err");
			setSnackbar(true);
			
		}
		setTimeout( () =>{
				setSnackbar(false);
			} , 3000)
		setGlobalUpdate(!globalUpdate);
		closeModal();
	};
	const handleDeleteFromCart = async () => {
		const valid = await onDeleteFromCart(id);
		if (valid) {
			setSnackbarText("Item Deleted Succesfully");
			setSnackbarType("success");
			setSnackbar(true);
		}else{
			setSnackbarText("Failed To Delete Item");
			setSnackbarType("err");
			setSnackbar(true);
		}
		setTimeout( () =>{
				setSnackbar(false);
			} , 3000)
		setGlobalUpdate(!globalUpdate);
		closeModal();
	};

	const openModal = async (type) => {
		if (type === 'add') {
			setOverlayComponent(addToCartHTML);
			setOverlay(true);
		} else if (type === 'remove') {
			setOverlayComponent(deleteFromCartHTML);
			setOverlay(true);
		}
	};

	const closeModal = () => {
		setOverlay(false);
		setOverlayComponent(false);
	};
	const addToCartHTML = <Modal text="Are you sure you want to add this item ?" onRemove={closeModal} onConfirm={handleAddToCart} />;
	const deleteFromCartHTML = <Modal text="Are you sure you want to delete this item ?" onRemove={closeModal} onConfirm={handleDeleteFromCart} />;
	
	return (
		<div className="flex flex-row m-10 flex-none bg-white p-5 w-3/4 rounded-xl">
			<div className={`basis-3/12 flex flex-col justify-center items-center`}>
				<img className="w-32 h-auto" alt="product" src={image} />
			</div>
			<div className="basis-9/12 flex flex-col pl-8 justify-evenly">
				<div className={'flex flex-row justify-between'}>
					<div>
						<h4 className="text-lg">{title}</h4>
					</div>
					{qty ? (
						<div>
							<button onClick={() => openModal('remove')} className="cursor-pointer p-1 active:bg-stone-100 hover:bg-stone-200 rounded-lg">
								<AiFillDelete className="text-2xl text-red-800" />
							</button>
						</div>
					) : (
						''
					)}
				</div>
				<div>
					<Rating count={5} value={rating.rate} />
				</div>
				<div className={`text-lg flex flex-row justify-between`}>
					<div className="flex flex-row justify-start">
						<h4>{price} $</h4>
					</div>
					{qty ? (
						<div className="basis-1/2 flex flex-col sm:flex-row justify-evenly items-center">
							<div className="flex flex-col justify-center items-center text-white">
								<button
									onClick={async () => {
										await onChangeQty(id, qty - 1);
										setGlobalUpdate(!globalUpdate);
									}}
									className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 p-2 rounded-lg"
								>
									<p>-</p>
								</button>
							</div>
							<div>
								<h5> qty: {qty} </h5>
							</div>

							<div className="flex flex-col justify-center items-center text-white">
								<button
									onClick={async () => {
										await onChangeQty(id, qty + 1);
										setGlobalUpdate(!globalUpdate);
									}}
									className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 p-2 rounded-lg"
								>
									<p>+</p>
								</button>
							</div>
						</div>
					) : (
						''
					)}
				</div>
				<div className={`${loading && 'skeleton'} text-md hidden sm:flex`}>
					<h6>{description}</h6>
				</div>

				{!qty ? (
					<div className="flex flex-col text-md justify-start items-start mt-3">
						<button onClick={() => openModal('add')} className={`${loading && 'skeleton'} bg-indigo-700 text-white hover:indigo-600 active:bg-indigo-500 rounded-md p-2`}>
							<h5>Add To Cart</h5>
						</button>
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}
