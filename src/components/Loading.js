export default function Loading({msg ,color}){
	return(
			<div className = {`messageRoot`}>
				<div>
					<div className = {`textRoot`}>
						
						<h2 className={`text-${color}`}>
							{msg}
						</h2>
					</div>

					<div>

						<div className = {`loader`}/>
						<div className = {`loading text-${color} font-extrabold`}></div>

					</div>

				</div>

			</div>
	)
}