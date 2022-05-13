import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../firebase";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

const GenerateWords = ({ userSubmit, wordPoem, setWordPoem, errorState }) => {
	let navigate = useNavigate();

	//suggested 50 words from the api call state
	const [wordCollection, setWordCollection] = useState([]);
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
					setWordCollection(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [userSubmit]);

	//a function that will detect what is being clicked and adds a word to the empty array.
	const handleSelection = (wordCollection) => {
		//empty array + what was clicked + empty space concat
		setWordPoem([wordPoem + wordCollection.word + " "]);
	};

	//submit button for the 2nd form that will push the poem to firebase.
	const handleSubmit = (event) => {
		event.preventDefault();
		const database = getDatabase(firebase);
		const dbRef = ref(database);

		//push whatever the user has typed
		push(dbRef, { wordPoem: wordPoem });

		// reset the state to an empty string
		setWordPoem("");

		navigate("/");
	};

	const handleClear = (wordPoem) => {
		wordPoem.preventDefault();
		setWordPoem([]);
		console.log("setWordPoem", setWordPoem);
	};

	const handleOne = (words) => {
		words.preventDefault();
		setWordPoem(wordPoem.toString().split(" ").slice(0, -1).join(" "));
		console.log(setWordPoem);
	};

	// styling function to add class to 50 words
	const rotationRandomizer = () => {
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

	//looping through 50 words that we get back from the api to display them on the page.
	//2nd form below
	return (
		<div>
			{errorState ? <p className="errP">no data found</p> : <p>null=good</p>}

			{wordCollection.length !== 0 ? (
				wordCollection.map((wordCollection, index) => {
					return (
						<div
							key={index}
							onClick={() => handleSelection(wordCollection)}
							className={rotationRandomizer()}
						>
							{wordCollection.word}
						</div>
					);
				})
			) : (
				<p>error</p>
			)}

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
					<textarea
						id="poem"
						value={wordPoem}
						className="poemBox"
						onChange={handleSelection}
						placeholder="Select the words above to create a poem!"
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
