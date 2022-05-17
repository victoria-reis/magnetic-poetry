//modules
import { useEffect, useState } from "react";
import axios from "axios";

//components
import FunctionWordsSelect from "./FunctionWordsSelect";
import GenerateWords from "./GenerateWords";
import Form from "./Form";
import { toast } from "react-toastify";
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
	//error handling state
	const [errorState, setErrorState] = useState(false);
	//state for the color
	const [colorChange, setColourChange] = useState("");

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
				})
				.catch((error) => {
					if (error) {
						toast.error("Error 404. Request not found");
					}
				});
		}
	}, [autoFill]);

	//parent component that passes states to respective child components through props
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

			<FunctionWordsSelect
				setWordPoem={setWordPoem}
				wordPoem={wordPoem}
				colorChange={colorChange}
			/>

			<CustomWordSelect
				setWordPoem={setWordPoem}
				wordPoem={wordPoem}
				colorChange={colorChange}
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
				colorChange={colorChange}
				setColourChange={setColourChange}
			/>
		</section>
	);
};

export default AutoComplete;
