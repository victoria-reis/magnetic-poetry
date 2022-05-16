//modules
import { useState } from "react";

const CustomWordSelect = ({
	wordPoem,
	setWordPoem,
	rotationRandomizer,
	colorChange,
}) => {
	//states
	const [customInput, setCustomInput] = useState("");
	const [customTextBox, setCustomTextBox] = useState([]);
	const [customUserSubmit, setCustomUserSubmit] = useState(false);

	//handle submit button
	const handleCustomSubmit = (e) => {
		e.preventDefault();
		//if the search field is not empty set the previous array to whatever the user has to type
		//create a copy of array and pushing custom input
		//setting back to empty string
		if (customInput !== "") {
			setCustomUserSubmit(true);
			setCustomTextBox([...customTextBox, customInput]);
			setCustomInput("");
		}
	};

	//user input, trim cut empty spaces
	const handleCustomChange = (e) => {
		setCustomInput(e.target.value.trim());
	};

	//adding the word to poemdisplay + empty string
	const handleCustomSelection = (customWord) => {
		console.log(customWord);
		setWordPoem([wordPoem + " " + customWord]);
	};

	//mapping through custom words
	return (
		<div>
			<div>
				<form
					className="searchForm"
					onSubmit={(event) => {
						handleCustomSubmit(event);
					}}
				>
					<label htmlFor="search">Custom text</label>
					<div className="inputOptionsContainer">
						<input
							type="search"
							id="search"
							onChange={(e) => {
								handleCustomChange(e);
							}}
							value={customInput}
							placeholder="Add a word"
						/>
					</div>
					<button type="submit">Add</button>
				</form>
			</div>

			<div className="customWordCollection">
				{customUserSubmit !== false ? (
					customTextBox.map((customWord, index) => {
						return (
							<div
								key={index}
								onClick={() => handleCustomSelection(customWord)}
								className={rotationRandomizer()}
								style={{ color: colorChange }}
							>
								{customWord}
							</div>
						);
					})
				) : (
					<p>Empty. Please type in a word to add.</p>
				)}
			</div>
		</div>
	);
};

export default CustomWordSelect;
