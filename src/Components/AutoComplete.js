import { useEffect, useState } from "react";
import axios from "axios";

import GenerateWords from "./GenerateWords";
import Form from "./Form";

import firebase from "../firebase";
import { getDatabase, ref, onValue, push } from "firebase/database";

const AutoComplete = () => {
	const [autoFill, setAutoFill] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [userSubmit, setUserSubmit] = useState("");
	const [show, setShow] = useState(true);
	const [wordCollection, setWordCollection] = useState([]);

	//state for the poem input
	const [poems, setPoems] = useState([]);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
		// create a variable that holds our database details
		const database = getDatabase(firebase);

		// we then create a variable that makes reference to our database
		const dbRef = ref(database);

		// add an event listener to that variable that will fire
		// from the database, and call that data 'response'.
		onValue(dbRef, (response) => {
			const newState = [];
			const data = response.val();

			for (let key in data) {
				newState.push(data[key]);
			}
			// here we use Firebase's .val() method to parse our database info the way we want it
			console.log(response.val());
			setPoems(newState);
		});
	}, []);

	const handleInputChange = (event) => {
		// equal to whatever is currently the value of the input field
		setUserInput(event.target.value);
	};

	const handleSubmit = (event) => {
		// event.preventDefault prevents the default action (form submission and page refresh)
		event.preventDefault();

		// create a reference to our database
		const database = getDatabase(firebase);
		const dbRef = ref(database);

		// push the value of the `userInput` state to the database
		push(dbRef, userInput);

		// reset the state to an empty string
		setUserInput("");
	};

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

	return (
		<section>
			{/* checking how the poem will be linked to the database */}
			<div className="poems">
				{poems.map((poem) => {
					return (
						<div key={poem.key}>
							<h1>{poem.title}</h1>
						</div>
					);
				})}
			</div>

			<form>
				<label htmlFor="newBook">Add a poem</label>
				<input
					type="text"
					id="newBook"
					onChange={handleInputChange}
					value={userInput}
				/>
				<button onClick={handleSubmit}>Submit</button>
			</form>

			{/* poems end */}

			<Form
				setAutoFill={setAutoFill}
				setUserSubmit={setUserSubmit}
				setShow={setShow}
				autoFill={autoFill}
				show={show}
				AutoComplete={AutoComplete}
				suggestions={suggestions}
			/>

			<GenerateWords
				setWordCollection={setWordCollection}
				userSubmit={userSubmit}
				wordCollection={wordCollection}
			/>
		</section>
	);
};

export default AutoComplete;
