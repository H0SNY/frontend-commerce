import { useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
export default function Paging({items , itemPerPage}) {
	const [page ,  setPage] = useState(1);
	const pages = Math.ceil((items.length / itemPerPage))
	const createPage = (ir, index) => {
		return (
			<div key = {index + Math.random() * 100000}  className={`basis-1/12`}>
				<button onClick = {() => setPage(index + 1)} className={( (index + 1) === page ) ? "bg-indigo-600 rounded-2xl w-full h-full" : "w-full bg-stone-300 rounded-lg"}>
					<p>{index + 1}</p>
				</button>
			</div>
		);
	};
	const handleBack = () =>{
		if(page === 1) return;
		else setPage(page - 1)
	}
	const handleForward = () =>{
		if(page === pages) return;
		else setPage(page + 1);
	}
	

	return (
		<div key = {Math.random() * 200000} className="flex flex-col justify-center items-center">
			<div className="flex flex-col flex-wrap justify-center items-center">{items.slice((page - 1) * itemPerPage , ( (page - 1) * itemPerPage + 3) )}</div>
			<div className="flex flex-row justify-evenly w-full">
				<div className="basis-1/12 flex flex-col justify-center items-center">
					<button onClick = {handleBack} className='cursor-pointer'>
						<IconContext.Provider value={{className : "text-indigo-600 text-xl"}}>
							<div className='flex flex-col justify-center items-center'>
								<BsFillArrowLeftCircleFill />
							</div>
						</IconContext.Provider>
					</button>
				</div>
				{new Array(pages).fill(0).slice(0, 10).map(createPage)}
				<div className="basis-1/12">
					<button onClick={handleForward} className='cursor-pointer'>
						<IconContext.Provider value={{className : "text-indigo-600 cursor-pointer text-xl"}}>
						<div>
							<BsFillArrowRightCircleFill />
						</div>
						</IconContext.Provider>
					</button>
				</div>
			</div>
		</div>
	);
}
