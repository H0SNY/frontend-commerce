import { useContext, useEffect, useRef, useState } from 'react';
import BG from '../assets/commerce-bg-1.png';
import { getProductsByCategory, getProductsBySearch } from '../connections/products';
import { motion } from 'framer-motion';
import {Paging} from '../HOC';
import { GlobalContext } from '../store/GlobalProvider';
import {Categories , ProductPreview , Loading} from '../components';
import useOnScreen from '../hooks/useOnScreen';

export default function Landing({onAddToCart }) {
	const productsRef = useRef();
	const onScreen = useOnScreen(productsRef, '100px');
	const [loading, setLoading] = useState(true);
	const { category, categories, productsErr, setProductsErr, mainOpen, setSnackbar , setSnackbarType , setSnackbarText , loading: globalLoading, products, query, setProducts, setCategoriesOpen } = useContext(GlobalContext);
	const { type } = products;
	const renderProduct = (product) => {
		return <ProductPreview key={product.id} onAddToCart={onAddToCart} product={product} loading={loading || globalLoading} />;
	};
	useEffect(() => {
		setLoading(true);
		const getDataBySearch = async () => {
			const { valid, items } = await getProductsBySearch(query);
			if (!valid){
				setSnackbarText('Something went wrong , check your internet connection');
				setSnackbarType("err");
				setSnackbar(true);
				setProductsErr(true);
				setTimeout(() =>{
					setSnackbar(false)
				} , 3000)
			}
			else{
				setProducts(items);
				setProductsErr(false);
			}
		};
		const getDataByCategory = async () => {
			const { valid, items } = await getProductsByCategory(category?.title);
			if (!valid){
				setSnackbarText('Something went wrong , check your internet connection');
				setSnackbarType("err");
				setSnackbar(true);
				setProductsErr(true);
				setTimeout(() =>{
					setSnackbar(false)
				} , 3000)
			}
			else {
				setProducts(items);
				setProductsErr(false);
			}
				
			
		};
		if (!globalLoading) {
			if (type === 'category') getDataByCategory();
			if (type === 'search') getDataBySearch();
			setLoading(false);
		}
	}, [globalLoading, category, setProducts, type, query, setProductsErr]);
	return (
		<div className={`flex flex-col w-full relative z-25`}>
			{mainOpen ? (
				<div className="flex z-20 h-fit w-full">
					<motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 1 }} className="absolute z-20 w-full opacity-85">
						<img alt="background" className="z-20" src={BG} />
					</motion.div>
					<motion.div animate={{ y: [-500, 0, -100, 0] }} transition={{ duration: 1, type: 'tween' }} className={`w-1/2 relative flex flex-col justify-center items-start px-5 mt-8  md:pl-12`}>
						<div className="flex flex-col justify-start items-start">
							<h1 className="sm:text-4xl md:text-5xl lg:text-7xl text-sm">Buy Electronics , Clothes Seamleassly</h1>
						</div>
						<div>
							<h4 className="mt-3 md:text-md lg:text-lg text-xs text-white">get latest gadgets and designer clothes online</h4>
						</div>
						<div className="flex flex-col justify-center items-center">
							<button
								onClick={() => {
									setCategoriesOpen(true);
								}}
								className="bg-purple-500 pb-50 text-xs sm:w-40 lg:text-md w-40 h-10 sm:h-14 mt-4 p-4 rounded-lg text-white hover:bg-purple-600"
							>
								<h4>Browse Products</h4>
							</button>
						</div>
					</motion.div>
				</div>
			) : (
				''
			)}
			<div  className={`flex flex-col justify-center items-center ${mainOpen ? String('mt-40 md:mt-64 lg:mt-80 xl:mt-96') : ''}`}>
				<Categories categories={categories} loading={globalLoading} />
			</div>
			<div ref={productsRef} className="flex flex-col justify-center items-center">
				{onScreen ? (
					<motion.div animate={{ opacity: [0, 1], x: [300, 0] }} transition={{ duration: 1.5, delay: 1 }} className={`flex flex-col justify-center items-center mt-8 opacity-0`}>
						{!productsErr && !loading ? <Paging items={products?.value?.map(renderProduct)} itemPerPage={3} /> : ''}
						
						{loading ? <Loading color="indigo-600" textColor="black" /> : ''}
					</motion.div>
				) : (
					''
				)}
			</div>
		</div>
	);
}
