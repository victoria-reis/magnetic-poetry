import { useEffect, useState } from "react";
import axios from "axios";

import GenerateWords from "./GenerateWords";
import Form from "./Form";

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

  //pass the autofill as a parameter to display whatever is returned as a state
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

