import { useEffect, useState } from "react";
import axios from "axios";

import GenerateWords from "./GenerateWords";
import Form from "./Form";


const AutoComplete = () => {
	const [autoFill, setAutoFill] = useState("");
	const [suggestions, setSuggestions] = useState([]);
  const [userSubmit, setUserSubmit] = useState("");
  const [show, setShow] = useState(true);
  const [wordCollection, setWordCollection] = useState([])

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
			<Form setAutoFill={setAutoFill} setUserSubmit={setUserSubmit} setShow={setShow} autoFill={autoFill} show={show} AutoComplete={AutoComplete} suggestions={suggestions} />

			<GenerateWords setWordCollection={setWordCollection} userSubmit={userSubmit} wordCollection={wordCollection} />
		</section>
	);
};

export default AutoComplete;