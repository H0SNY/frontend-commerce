import { motion } from 'framer-motion';
export default function Snackbar({on , type ,  msg }) {
		return (<>
		{!on ? "" : <motion.div className="min-w-3/12 h-12 fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover rounded-xl"  id="modal-id">
			<motion.div animate={{ y: [-1500,0 , 0 ,-1500], opacity: [0, 1 , 1 , 0] }} transition={{ duration: 4 }} className="opacity-0 rounded-xl">
				<div className="absolute bg-black opacity-80 inset-0 z-0 rounded-xl"></div>
				<div className="w-full max-w-lg p-1 relative mx-auto my-auto rounded-xl backdrop-blur-lg  bg-white ">
					<div className="">
						<div className="text-center p-1 flex-auto justify-center">
							
							<h2 className={`text-xl font-bold py-4 ${(type === 'err') ? "text-red-500" : "text-green-500"}`}>{msg}</h2>
						</div>

					</div>
				</div>
			</motion.div>
		</motion.div>}
		</>
	);
}
