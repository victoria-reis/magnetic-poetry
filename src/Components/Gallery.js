import { useEffect, useState } from "react";
import firebase from "../firebase";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { rotationRandomizer } from "./Other";

const Gallery = () => {
	//state to set the poems on the page
	const [poems, setPoems] = useState([]);

	useEffect(() => {
		const database = getDatabase(firebase);
		//database is a variable that holds our entire database with all the poems/details.

		const dbRef = ref(database);
		//create a reference to our database, ref represents a specific location in our database, so i guess we are referencing those pushed values only.

		// add an event listener to that variable that will fire
		// from the database, and call that data 'response'.
		onValue(dbRef, (response) => {
			const newState = [];
			const data = response.val();

			for (let key in data) {
				// pushing the values from the object into our newState array
				newState.push({ key: key, name: data[key].wordPoem });
			}
			// here we use Firebase's .val() method to parse our database info the way we want it
			console.log(response.val());
			setPoems(newState);
		});
	}, []);

	const handleRemovePoem = (poemId) => {
		// here we create a reference to the database
		// this time though, instead of pointing at the whole database, we make our dbRef point to the specific node of the book we want to remove
		const database = getDatabase(firebase);
		const dbRef = ref(database, `/${poemId}`);

		// using the Firebase method remove(), we remove the node specific to the book ID
		remove(dbRef);
	};

	//looping through 50 words that we get back from the api to display them on the page.
	//2nd form below

	return (
		<div>
			<ul className="poems">
				{poems.map((poem) => {
					return (
						<li key={poem.key}>
							{/* <p>{poem.name}</p> */}
							{poem.name[0]
								.trim()
								.split(" ")
								.map((word, index) => {
									return (
										<div key={index} className={rotationRandomizer()}>
											{word}
										</div>
									);
								})}
							<button onClick={() => handleRemovePoem(poem.key)}>Remove</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Gallery;
