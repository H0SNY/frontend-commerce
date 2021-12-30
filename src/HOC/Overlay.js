export default function Overlay({ component, on }) {
	return (
		<>
			{!on ? (
				''
			) : (
				<div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
					{component}
				</div>
			)}
		</>
	);
}
