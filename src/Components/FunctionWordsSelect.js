import FunctionWords from "../Data/FunctionWords";
import SuffixPrefixWords from "../Data/SuffixPrefixWords";
import { useState } from "react";
import { v4 } from "uuid";

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
		if (
			event.target.id === "suffixPrefix" &&
			event.target.innerText.charAt(0) === "-"
		) {
			setWordPoem([wordPoem + event.target.innerText.slice(1)]);
		} else if (
			event.target.id === "suffixPrefix" &&
			event.target.innerText.endsWith("-")
		) {
			setWordPoem([wordPoem + " " + event.target.innerText]);
		} else {
			setWordPoem([wordPoem + " " + event.target.innerText]);
		}
	};

	return (
		<>
			<form
				onSubmit={(event) => {
					handleFWordSubmit(event);
				}}
			>
				<label htmlFor="functionWords">
					Select a function word. Example: they, somebody, don't, above, etc.
				</label>
				<select name="functionWords" id="functionWords">
					<option value="">Select a function word</option>
					{FunctionWords.sort().map((word) => {
						if (
							word === "i" ||
							word === "i'd" ||
							word === "i'll" ||
							word === "i've"
						) {
							return (
								<option key={v4()} value={word}>
									{word.charAt(0).toUpperCase() + word.slice(1)}
								</option>
							);
						} else {
							return (
								<option key={v4()} value={word}>
									{word}
								</option>
							);
						}
					})}
				</select>
				<button type="submit">Generate piece</button>
			</form>
			<form
				onSubmit={(event) => {
					handleSuffixPrefixSubmit(event);
				}}
			>
				<label htmlFor="suffixPrefix">
					Select a suffix or prefix. Example: un-, auto-, -able, -cy, etc.
				</label>
				<select name="suffixPrefix" id="suffixPrefix">
					<option value="">Select a prefix or suffix</option>
					{SuffixPrefixWords.sort().map((word) => {
						return (
							<option key={v4()} value={word}>
								{word}
							</option>
						);
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
