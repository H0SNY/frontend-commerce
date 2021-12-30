import { BsStar } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';

export default function Rating({ count, value }) {
	const items = [];
	for (let i = 0; i < count; i++) {
		if (i + 1 < value) {
			items.push(value - Math.ceil(value));
			break;
		} else {
			items.push([1]);
		}
	}
	const renderStar = (val , index) => {
		return (
			<IconContext.Provider key = {index + Math.random() * 100000} value={{className : "text-orange-500"}} >
				<div>
					<BsStar />
				</div>
			</IconContext.Provider>
		);
	};
	const rest = count - items.length;
	const restArr = new Array(rest).fill(0);
	return (
		<div className="flex flex-row">
			{items.map(renderStar)}
			{restArr.map(renderStar)}
		</div>
	);
}
