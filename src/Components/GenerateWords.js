import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../firebase";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { rotationRandomizer } from "./Other";
import { v4 } from "uuid";

const GenerateWords = ({ userSubmit, wordPoem, setWordPoem, errorState, setErrorState }) => {
	let navigate = useNavigate();

	//suggested 50 words from the api call state
	const [wordCollection, setWordCollection] = useState([]);
	const [colorChange, setColourChange] = useState('')
	const [fontChange, setFontChange] = useState('')
	//the words that are clicked and are put into the 2nd input form
	// const [wordPoem, setWordPoem] = useState([]);

	//the topics returned whatever word the user has clicked and suggests a list of words based on that
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
					const array = response.data
					setWordCollection(response.data);
					console.log("data", array )
					if (array.length === 0) {
						throw Error ('ERROR')
					}
					setErrorState(false)
				})
				.catch((error) => {
					setErrorState(true)
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
		const poem = {
			wordPoem: wordPoem,
			style: event.target[0].style.color,
			font: event.target[0].style.fontFamily
		}
		console.log("poem", poem)
		//push whatever the user has typed
		if (poem.wordPoem.length !== 0) {
			push(dbRef, poem);
			// reset the state to an empty string
			setWordPoem("");
			navigate("/");
		}
	};

	const handleClear = (wordPoem) => {
		wordPoem.preventDefault();
		setWordPoem([]);
		console.log("setWordPoem", setWordPoem);
	};

	const handleOne = (words) => {
		words.preventDefault();
		setWordPoem(() => {
			// wordPoem.toString().split(" ").slice(0, -1).join(" ")
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

	const handleChange = (event) => {
		setColourChange(event.target.value);
	};


	const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
//value = a.name = red, yellow, green, blue

	const data2 = [
		{ name: 'Times New Roman' },
		{ name: 'Arial' },
		{ name: 'Trebuchet MS' },
		{ name: 'Segoe UI' },
		{ name: 'Cursive' }
	]
	const handleFontChange = (event) => {
		setFontChange(event.target.value)
	};

	const fonts = ['Times New Roman, Times, serif', 'Arial, Helvetica, sans-serif', 'Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif', 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 'Cursive'];


	//looping through 50 words that we get back from the api to display them on the page.
	//2nd form below
	return (
		<div>
			{errorState ? <p>no data from api</p> : <p>good</p>}
			<div>
				<form>
					<select name="ColorChange" id="colorChange" onChange={handleChange} >
						<option value="" >Select a Color</option>

						{data1.map((color, index) => {
							return (<option key={v4()} value={colors[index]} style={{ color: colors[index] }}  >{color.name} </option>

							)

						})}
					</select>
				</form>
				<form>
					<select name="FontChange" id="FontChange" onChange={handleFontChange} >
						<option value="" >Select a Font</option>

						{data2.map((font, index) => {
							return (<option key={v4()} value={fonts[index]
							}  style={{fontFamily: fonts[index]}}>{font.name} </option>
							)
						})}
					</select>
				</form>
				<p>{fontChange}</p>

			</div>
			
			<ul className="wordCollection">
			{wordCollection.length !== 0 ? (
				wordCollection.map((wordCollection, index) => {
					return (
						<li
							key={v4()}
							onClick={() => handleSelection(wordCollection)}
							className={rotationRandomizer()}
							style={{ color: colorChange, fontFamily: fontChange}}
						>
							{wordCollection.word}
						</li>
					);
				})
			) : (
				<p>Empty. Please type in words in the search bar.</p>
			)}
			</ul>

			{/* {

              wordCollection.length !== 0 && autoFill === ""
                ?
                wordCollection.map((wordCollection, index) => {
                    return (
                      <div key={index} onClick={() => handleSelection(wordCollection)}>
                        {wordCollection.word}
                      </div>
                    );
                  })
                :null
                (
                  <div>No words found</div>
                )
                } */}

			<div>
				<form
					onSubmit={(event) => {
						handleSubmit(event);
					}}
				>
					<div className="poemDisplay">
						{wordPoem[0]
							? wordPoem[0]
									.trim()
									.split(" ")
									.map((word) => {
										console.log(word);
										return <p key={v4()} className="magnetic"
											style={{ color: colorChange, fontFamily: fontChange }}>{word}
										</p>;
									})
							: null}
					</div>

					{/* this input is displayed none so we can style the words as magnetics*/}
					<input
						id="poem"
						value={wordPoem}
						className="poemBox"
						onChange={handleSelection}
						placeholder="Select the words above to create a poem!"
						style={{ color: colorChange, fontFamily: fontChange }}
						
					/>

					<button type="submit">Submit</button>
					<button onClick={handleClear}>ClearAll</button>
					<button onClick={handleOne}>Clear Last Word</button>
				</form>
			</div>
		</div>
	);
};

export default GenerateWords;
