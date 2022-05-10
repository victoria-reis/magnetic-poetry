import { useEffect, useState } from "react";
import axios from "axios";

const AutoComplete = () => {
	const [autoFill, setAutoFill] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [selectedWord, setSelectedWord] = useState("");

	useEffect(() => {
		axios({
			url: "https://api.datamuse.com/sug",
			method: "GET",
			dataResponse: "JSON",
			params: {
				s: autoFill,
				max: 10,
			},
		}).then((response) => {
			setSuggestions(response.data);
			console.log(response.data);
		});
	}, [autoFill]);

	const handleChange = (event) => {
		setAutoFill(event.target.value.trim());
		console.log(event.target.value);
	};

	const handleSelection = (event) => {
		setSelectedWord(event.target.innerText);
	};

	return (
		<section>
			<form>
				<label htmlFor="search">Search</label>

				<input
					type="text"
					id="search"
					onChange={(event) => {
						handleChange(event);
					}}
					value={selectedWord}
				/>

				<button type="submit">Submit</button>
			</form>
			<ul>
				{autoFill !== ""
					? suggestions.map((wordObj, index) => {
							return (
								<option key={index} onClick={(event) => handleSelection(event)}>
									{wordObj.word}
								</option>
							);
					  })
					: null}
			</ul>
		</section>
	);
};

export default AutoComplete;
