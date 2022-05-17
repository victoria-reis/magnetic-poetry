//modules
import axios from "axios";
import firebase from "../firebase";
import { getDatabase, ref, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//function from a component ./Other
import { rotationRandomizer } from "./Randomizer";

const GenerateWords = ({
	userSubmit,
	wordPoem,
	setWordPoem,
	errorState,
	colorChange,
	setColourChange,
}) => {
	let navigate = useNavigate();

	//suggested 50 words from the api call state
	const [wordCollection, setWordCollection] = useState([]);
	//state for the font
	const [fontChange, setFontChange] = useState("");

	//the topics returned whatever word the user has clicked and suggests a list of 50 words based on that
	useEffect(() => {
		if (userSubmit !== "") {
			axios({
				url: "https://api.datamuse.com/words",
				method: "GET",
				dataResponse: "JSON",
				params: {
					topics: userSubmit,
					max: 50,
				},
			})
				.then((response) => {
					const array = response.data;
					setWordCollection(response.data);
					if (array.length === 0) {
						toast.error("No words found.");
					}
				})
				.catch((error) => {
					if (error) {
						toast.error("Error 404. Request not found");
					}
				});
		}
	}, [userSubmit]);

	//a function that will detect what is being clicked and adds a word to the empty array.
	const handleSelection = (wordCollection) => {
		//empty array + what was clicked + empty space concat
		if (wordPoem.length !== 0 && wordPoem[0].endsWith("-")) {
			setWordPoem([wordPoem + wordCollection.word]);
		} else {
			setWordPoem([wordPoem + " " + wordCollection.word]);
		}
	};

	//submit button for the 2nd form that will push the poem to firebase.
	const handleSubmit = (event) => {
		console.log("event", event);
		event.preventDefault();
		const database = getDatabase(firebase);
		const dbRef = ref(database);
		console.log("wordPoem", wordPoem);
		//pushing poem, styles and fonts
		const poem = {
			wordPoem: wordPoem,
			style: event.target[0].style.color,
			font: event.target[0].style.fontFamily,
		};
		console.log("poem", poem);
		//push whatever the user has typed
		if (poem.wordPoem.length !== 0) {
			push(dbRef, poem);
			// reset the state to an empty string
			setWordPoem("");
			navigate("/");
		}
	};

	//setting the poem state to empty array
	const handleClear = (wordPoem) => {
		wordPoem.preventDefault();
		setWordPoem([]);
		console.log("setWordPoem", setWordPoem);
	};

	//checking if the input is empty, if it is then split each word into separate substrings in the array
	// then remove the last word from that array with pop, and convert it back to a string with join method.
	const handleOne = (words) => {
		words.preventDefault();
		setWordPoem(() => {
			if (wordPoem !== []) {
				const text = wordPoem[0].split(" ");
				text.pop();
				return [text.join(" ")];
			}
		});
	};

	const data1 = [
		{ name: "blue" },
		{ name: "green" },
		{ name: "yellow" },
		{ name: "orange" },
	];

	//see what color was selected
	const handleChange = (event) => {
		setColourChange(event.target.value);
	};

	const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
	//value = a.name = red, yellow, green, blue

	const data2 = [
		{ name: "Times New Roman" },
		{ name: "Arial" },
		{ name: "Trebuchet MS" },
		{ name: "Segoe UI" },
		{ name: "Cursive" },
	];

	//function for what font was selected
	const handleFontChange = (event) => {
		setFontChange(event.target.value);
	};

	const fonts = [
		"Times New Roman, Times, serif",
		"Arial, Helvetica, sans-serif",
		"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",
		"Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
		"Cursive",
	];
	//first thing in the form is mapping through each color with data1 array and then mapping through each font with data2 array.
	//then you map through each of the 50 words generated from the API and assign a style of the color/font that was selected from the dropdown.
	//the final form, the display form, that will have the words that were clicked to be displayed onto the grey background. Color and fonts applied to them, depending on the selection.
	return (
		<>
			<ul className="wordCollection">
				{errorState !== true ? (
					wordCollection.map((wordCollection) => {
						return (
							<li
								key={v4()}
								onClick={() => handleSelection(wordCollection)}
								className={rotationRandomizer()}
								style={{ color: colorChange, fontFamily: fontChange }}
							>
								{wordCollection.word}
							</li>
						);
					})
				) : (
					<p>Empty. Please type in words in the search bar.</p>
				)}
			</ul>

			<div className="poemDisplayContainer">
				<div className="poemColorFont">
					<form>
						<select name="ColorChange" id="colorChange" onChange={handleChange}>
							<option value="">Select a Color</option>

							{data1.map((color, index) => {
								return (
									<option
										key={index}
										value={colors[index]}
										style={{ color: colors[index] }}
									>
										{color.name}{" "}
									</option>
								);
							})}
						</select>
					</form>

					<form>
						<select
							name="FontChange"
							id="FontChange"
							onChange={handleFontChange}
						>
							<option value="">Select a Font</option>

							{data2.map((font, index) => {
								return (
									<option
										key={index}
										value={fonts[index]}
										style={{ fontFamily: fonts[index] }}
									>
										{font.name}{" "}
									</option>
								);
							})}
						</select>
					</form>
				</div>

				<form
					className="poemForm"
					onSubmit={(event) => {
						handleSubmit(event);
					}}
				>
					<div className="poemDisplay" aria-hidden="true">
						{wordPoem[0]
							? wordPoem[0]
									.trim()
									.split(" ")
									.map((word) => {
										console.log(word);
										return (
											<p
												key={v4()}
												className="magnetic"
												style={{ color: colorChange, fontFamily: fontChange }}
											>
												{word}
											</p>
										);
									})
							: null}
					</div>
					{/* this input is displayed none so we can style the words as magnetics*/}
					<input
						id="poem"
						value={wordPoem}
						className="sr-only"
						onChange={handleSelection}
						placeholder="Select the words above to create a poem!"
						style={{ color: colorChange, fontFamily: fontChange }}
					/>
					<button className="poemSubmit" type="submit">
						Submit
					</button>
				</form>

				<div className="poemButtons">
					<button className="poemClearAll" onClick={handleClear}>
						ClearAll
					</button>
					<button onClick={handleOne}>Clear Last Word</button>
				</div>
			</div>
		</>
	);
};

export default GenerateWords;
