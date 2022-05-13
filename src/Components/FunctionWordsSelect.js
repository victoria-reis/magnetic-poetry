import FunctionWords from "./Data/FunctionWords";
import SuffixPrefixWords from "./Data/SuffixPrefixWords";
import { useState } from "react";

const FunctionWordsSelect = ({ setWordPoem, wordPoem }) => {
	const [functionWord, setFunctionWord] = useState("");
	const [suffixPrefix, setSuffixPrefix] = useState("");

	const handleFWordSubmit = (event) => {
		event.preventDefault();
		setFunctionWord(event.target[0].value);
	};

	const handleSuffixPrefixSubmit = (event) => {
		event.preventDefault();
		setSuffixPrefix(event.target[0].value);
	};

	const handleSelection = (event) => {
		if (event.target.id === "suffixPrefix") {
			setWordPoem([wordPoem + event.target.innerText]);
		} else {
			setWordPoem([wordPoem + event.target.innerText + " "]);
		}
	};

	return (
		<>
			<form
				onSubmit={(event) => {
					handleFWordSubmit(event);
				}}
			>
				<select name="functionWords" id="functionWords">
					{FunctionWords.sort().map((word, index) => {
						return <option key={index} value={word}>{word}</option>;
					})}
				</select>
				<button type="submit">Generate piece</button>
			</form>
			<form
				onSubmit={(event) => {
					handleSuffixPrefixSubmit(event);
				}}
			>
				<select name="suffixPrefix" id="suffixprefix">
					{SuffixPrefixWords.sort().map((word, index) => {
						return <option key={index} value={word}>{word}</option>;
					})}
				</select>
				<button type="submit">Generate piece</button>
			</form>

			<p
				onClick={(event) => {
					handleSelection(event);
				}}
			>
				{functionWord}
			</p>
			<p
				onClick={(event) => {
					handleSelection(event);
				}}
				id="suffixPrefix"
			>
				{suffixPrefix}
			</p>
		</>
	);
};

export default FunctionWordsSelect;
