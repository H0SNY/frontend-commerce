import { motion } from 'framer-motion';

export default function Modal({ text, onRemove, onConfirm }) {
	return (
		<motion.div animate={{ x: [-1500, 0], opacity: [0, 1] }} transition={{ duration: 1 }} className="opacity-0">
			<div className="absolute bg-black opacity-80 inset-0 z-0"></div>
			<div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg backdrop-blur-lg  bg-white ">
				<div>
					<div className="text-center p-5 flex-auto justify-center">
						<h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
						<p className="text-sm text-gray-500 px-8">{text}</p>
					</div>
					<div className="p-3  mt-2 text-center text-white space-x-4 md:block">
						<button className="mb-2 md:mb-0 bg-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border rounded-full hover:shadow-lg hover:bg-red-400" onClick={onRemove}>
							Cancel
						</button>
						<button className="mb-2 md:mb-0 bg-green-500 border px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full hover:shadow-lg hover:bg-green-400" onClick={onConfirm}>
							Confirm
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
