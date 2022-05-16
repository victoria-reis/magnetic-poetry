//modules
import { useEffect, useState } from "react";
import axios from "axios";

//components
import GenerateWords from "./GenerateWords";
import Form from "./Form";
import FunctionWordsSelect from "./FunctionWordsSelect";
import CustomWordSelect from "./CustomWordSelect";

const AutoComplete = () => {
	//state for input field
	const [autoFill, setAutoFill] = useState("");
	//autocomplete feature state, with options that drop down
	const [suggestions, setSuggestions] = useState([]);
	//textbox submit for the input field
	const [userSubmit, setUserSubmit] = useState("");
	//hiding the suggestions/dropdown
	const [show, setShow] = useState(true);
	//state for 50 words from 2nd api call
	const [wordCollection, setWordCollection] = useState([]);
	//the words that are clicked and are put into the 2nd input form
	const [wordPoem, setWordPoem] = useState([]);
	const [errorState, setErrorState] = useState(false);
	// const [loading, setLoading] = useState(false)

	//pass the autofill as a parameter to display whatever is returned as a state
	useEffect(() => {
		if (autoFill !== "") {
			axios({
				url: "https://api.datamuse.com/sug",
				method: "GET",
				dataResponse: "JSON",
				params: {
					s: autoFill,
					max: 10,
				},
			})
				.then((response) => {
					setSuggestions(response.data);
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [autoFill]);

	return (
		<section>
			<Form
				setAutoFill={setAutoFill}
				setUserSubmit={setUserSubmit}
				setShow={setShow}
				autoFill={autoFill}
				show={show}
				AutoComplete={AutoComplete}
				suggestions={suggestions}
				setErrorState={setErrorState}
				userSubmit={userSubmit}
			/>

			<GenerateWords
				setWordCollection={setWordCollection}
				userSubmit={userSubmit}
				wordCollection={wordCollection}
				setWordPoem={setWordPoem}
				wordPoem={wordPoem}
				errorState={errorState}
				setErrorState={setErrorState}
				setUserSubmit={setUserSubmit}
			/>

			<FunctionWordsSelect setWordPoem={setWordPoem} wordPoem={wordPoem} />
			<CustomWordSelect setWordPoem={setWordPoem} wordPoem={wordPoem} />
		</section>
	);
};

export default AutoComplete;
