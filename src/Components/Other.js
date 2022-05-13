export const rotationRandomizer = () => {
	const randomNum = Math.floor(Math.random() * 10);
	const style1 = "style-1";
	const style2 = "style-2";
	const style3 = "style-3";
	const style4 = "style-4";
	const style5 = "style-5";
	if (randomNum <= 2) {
		return `magnetic ${style1}`;
		// console.log(randomNum, style1);
	} else if (randomNum > 2 && randomNum <= 4) {
		return `magnetic ${style2}`;
		// console.log(randomNum, style2);
	} else if (randomNum > 4 && randomNum <= 6) {
		return `magnetic ${style3}`;
		// console.log(randomNum, style3);
	} else if (randomNum > 6 && randomNum <= 8) {
		return `magnetic ${style4}`;
		// console.log(randomNum, style2);
	} else if (randomNum > 8) {
		return `magnetic ${style5}`;
		// console.log(randomNum, style2);
	}
};
