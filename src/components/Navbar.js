import { useContext } from 'react';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsFillCartFill } from 'react-icons/bs';
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion';
import { GlobalContext } from '../store/GlobalProvider';
import { Link, NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
export default function Navbar({ onSignout }) {
	const [cookies] = useCookies('auth', 'user');
	const { user, auth } = cookies;
	const { setQuery, setProductsType, setCategory, setMainOpen, setCategoriesOpen, setProductsErr, categoriesOpen, category, categories, cart, loading , productsErr} = useContext(GlobalContext);

	const renderCategory = (cat) => {
		return (
			<div
				key={cat.title}
				onClick={() => {
					setCategory(cat);
					setProductsType('category');
					setMainOpen(false);
				}}
				className="flex flex-row justify-center items-center p-3 cursor-pointer hover:bg-slate-300 rounded-lg"
			>
				<h5>{cat.title}</h5>
			</div>
		);
	};

	return (
		<div className="relative z-50 flex flex-row justify-center items-center p-2 h-20 bg-indigo-600 text-white">
			<NavLink to="/" className="basis-2/12 sm:basis-3/12 text-xl mr:5 flex flex-row justify-start sm:justify-center items-center">
				<h6>store</h6>
				<h1>logo</h1>
			</NavLink>
			<div
				onSubmit={(e) => {
					e.preventDefault();
					setProductsType('search');
					setQuery(e.target.value);
					console.log(e.target.textContent);
				}}
				className="sm:basis-5/12 relative z-50 h-10 rounded-lg sm:flex sm:flex-row justify-start sm:justify-center items-center hidden"
				
			>
				{/*eslint-disable */}
				<button
					onClick={() => {
						setCategoriesOpen(!categoriesOpen);
					}}
					type="button"
					className="categories basis-3/12 rounded-l-lg h-full flex flex-row items-center bg-slate-900"
				>
					<div className="categories basis-9/12 text-xs">
						<p className="categories">{category.title}</p>
					</div>
					<IconContext.Provider value={{ className: 'categories' }}>
						<div className="categories basis-3/12 flex flex-column justify-center items-center">{!categoriesOpen ? <BsFillArrowDownCircleFill className="categories" /> : <BsFillArrowUpCircleFill className="categories" />}</div>
					</IconContext.Provider>

					{categoriesOpen ? (
						<motion.div animate={{ y: [-500, 0], opacity: [0, 1] }} transition={{ duration: 1 }} className="absolute text-black bg-white top-16 left-3 z-50 opacity-0 rounded-lg">
							{categories.map(renderCategory)}
						</motion.div>
					) : (
						''
					)}
				</button>
				<input
					className="w-8/12 h-full rounded-r-lg text-black pl-5"
					type="text"
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') setProductsType('search');
						setProductsErr(false);
						setMainOpen(false);
					}}
				/>
			</div>
			<div className={`sm:basis-5/12 basis-9/12 flex flex-row justify-center items-center sm:text-sm md:text-base text-xs h-full ml-3`}>
				<a href="/" className="basis-4/12 flex flex-row justify-center items-center ">
					<div className="flex flex-row hover:text-black">
						<div className="basis-7/12 mr-3 text-lg flex flex-row justify-center items-center">
							<h5 className={`${!auth ? 'text-sm' : ''}`}>{auth ? user.firstName : 'Account'}</h5>
						</div>
					</div>
				</a>
				{auth ? (
					<div className="flex flex-row justify-center items-center">
						<button className="hover:text-black" onClick={() => onSignout()}>
							<h5>Signout</h5>
						</button>
					</div>
				) : (
					<>
						<Link to="login" className="basis-3/12 flex flex-row justify-center items-center hover:text-slate-800">
							<div>
								<h6>Login</h6>
							</div>
						</Link>
						<Link to="signup" className="basis-3/12 flex flex-row justify-center hover:text-slate-800">
							<div href="/">
								<h6>SignUp</h6>
							</div>
						</Link>{' '}
					</>
				)}

				<Link to="cart" className="relative basis-3/12 flex flex-row justify-center hover:text-slate-800">
					<BsFillCartFill className="text-xl" />
					{(!loading && cart.items) ? (
						<div className="absolute text-xs text-black bottom-2 p-1 bg-indigo-700 ml-5 rounded-full">
							<h2>{cart.items.length}</h2>
						</div>
					) : (
						''
					)}
				</Link>
			</div>
		</div>
	);
}
