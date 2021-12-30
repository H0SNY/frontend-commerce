import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalProvider';
import {Loading} from '.';
export default function Categories({ categories , loading}) {
	const { setCategory, setProductsType , setMainOpen } = useContext(GlobalContext);

	const renderCategory = (cat) => {
		return (
			<div key={cat.title} className="flex-none w-52 h-52 my-10 mx-3 rounded-xl flex flex-col justify-between  text-black sm:bg-transparent bg-gray-300 backdrop-blur-md relative pb-3 z-50  items-start">
				<div className={loading ? "skeleton" :  `absolute h-full w-full opacity-50 rounded-lg`}>
					<img className="rounded-lg h-full w-auto" alt="category" src={require(`../assets/${cat.image}.png`)} />
				</div>
				<div className={loading ? 'skeleton' :  `flex flex-col text-xl pt-3 pl-3`}>
					<h5>{cat.title}</h5>
				</div>
				<div className="flex flex-row justify-start pl-2">
					<button
						onClick={() => {
							setCategory(cat);
							setProductsType('category');
							setMainOpen(false);
						}}
						className={loading ? 'skeleton' :  `p-1 rounded-lg bg-green-400 hover:bg-green-500 text-white`}
					>
						<p>Shop Now</p>
					</button>
				</div>
			</div>
		);
	};
	return( <>{loading ?  <Loading color = "black"/> : <div className="flex w-full flex-col sm:flex-row flex-wrap justify-evenly items-center">{categories.map(renderCategory)}</div>}</>);
}
