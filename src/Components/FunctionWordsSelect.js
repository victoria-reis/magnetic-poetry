//modules
import { useState } from "react";
import { v4 } from "uuid";
//components
import FunctionWords from "../Data/FunctionWords";
import SuffixPrefixWords from "../Data/SuffixPrefixWords";
import { rotationRandomizer } from "./Randomizer";

const FunctionWordsSelect = ({ setWordPoem, wordPoem, colorChange }) => {
	//state for function word
	const [functionWord, setFunctionWord] = useState("");
	//state for prefix and suffix words
	const [suffixPrefix, setSuffixPrefix] = useState("");

	//sets the state for the function word
	const handleFWordSubmit = (event) => {
		event.preventDefault();
		setFunctionWord(event.target[0].value);
	};

	//sets the state for prefixes and suffix words
	const handleSuffixPrefixSubmit = (event) => {
		event.preventDefault();
		setSuffixPrefix(event.target[0].value);
	};

	//whenever the user clicks the suffixes word it has a specific class and that character that starts with -.
	const handleSelection = (event) => {
		if (
			event.target.id === "suffixPrefix" &&
			event.target.innerText.charAt(0) === "-"
		) {
			//sets the state for it
			setWordPoem([wordPoem + event.target.innerText.slice(1)]);
		} else if (
			//suffix that ends with the hyphen
			event.target.id === "suffixPrefix" &&
			event.target.innerText.endsWith("-")
		) {
			setWordPoem([wordPoem + " " + event.target.innerText]);
		} else {
			//function word that is being set onto the page
			setWordPoem([wordPoem + " " + event.target.innerText]);
		}
	};

	//form to loop through all the function word
	//so for the first generate piece your sort through the array, however if the word starts with those four exceptions you capitalize them, and not capitalizing everything else.
	//for the second generate piece you just append two options - the suffix or the prefix.
	return (
		<div className="suffixPrefixForms">
			<form
				onSubmit={(event) => {
					handleFWordSubmit(event);
				}}
			>
				<label htmlFor="functionWords" className="sr-only">
					Select a function word. Example: they, somebody, don't, above, etc.
				</label>
				<select
					name="functionWords"
					id="functionWords"
					title="Select a function word. Example: they, somebody, don't, above, etc."
				>
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
				<button type="submit">Add</button>
			</form>
			<form
				onSubmit={(event) => {
					handleSuffixPrefixSubmit(event);
				}}
			>
				<label htmlFor="suffixPrefix" className="sr-only">
					Select a suffix or prefix. Example: un-, auto-, -able, -cy, etc.
				</label>
				<select
					name="suffixPrefix"
					id="suffixPrefix"
					title="Select a suffix or prefix. Example: un-, auto-, -able, -cy, etc."
				>
					<option value="">Select a prefix or suffix</option>
					{SuffixPrefixWords.sort().map((word) => {
						return (
							<option key={v4()} value={word}>
								{word}
							</option>
						);
					})}
				</select>
				<button type="submit">Add</button>
			</form>

			<div className="fWordsCollection">
				{functionWord ? (
					<div
						onClick={(event) => {
							handleSelection(event);
						}}
						className={rotationRandomizer()}
						style={{ color: colorChange }}
					>
						{functionWord === "i" ||
						functionWord === "i'd" ||
						functionWord === "i'll" ||
						functionWord === "i've"
							? functionWord.charAt(0).toUpperCase() + functionWord.slice(1)
							: functionWord}
					</div>
				) : null}
				{suffixPrefix ? (
					<div
						onClick={(event) => {
							handleSelection(event);
						}}
						className={rotationRandomizer()}
						id="suffixPrefix"
						style={{ color: colorChange }}
					>
						{suffixPrefix}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default FunctionWordsSelect;
