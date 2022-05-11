import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "./firebase";

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

  useEffect(() => {
    axios({
      url: "https://api.datamuse.com/words",
      method: "GET",
      dataResponse: "JSON",
      params: {
        rel_jja: userSubmit,
        max: 50,
      },
    })
      .then((response) => {
        setWordCollection(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [userSubmit]);

	const handleChange = (event) => {
		setAutoFill(event.target.value.trim());
		console.log(event.target.value);
    setShow(true);
	};

	const handleSelection = (wordObj) => {
    setAutoFill(wordObj.word);
    setShow(false)

  };

  	const handleSubmit = (event) => {
      event.preventDefault();

      setUserSubmit(autoFill);

      setAutoFill("");
    };


	return (
		<section>
			<form onSubmit={(event) => {handleSubmit(event)}}>
				<label htmlFor="search">Search</label>

				<input
					type="text"
					id="search"
					onChange={(event) => {
						handleChange(event);
					}}
					value={autoFill}
				/>

				<button type="submit">Submit</button>
			</form>
			<ul>
				{autoFill !== ""
					? suggestions.map((wordObj, index) => {
							return (
								<option key={index} style={{display: show ? "block" : "none"}} onClick={() => handleSelection(wordObj)}>
									{wordObj.word}
								</option>

							);
					  })
					: null}
			</ul>
      <div>
        {wordCollection.map((wordCollection,index) => {
          return (
            <div key={index}>
              {wordCollection.word}
            </div>
          )
        })}
      </div>
		</section>
	);
};

export default AutoComplete;
