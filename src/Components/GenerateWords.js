import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../firebase";
import { getDatabase, ref, onValue, push } from "firebase/database";

const GenerateWords = ({userSubmit}) => {
    //suggested 50 words from the api call state
    const [wordCollection, setWordCollection] = useState([]);
    //the words that are clicked and are put into the 2nd input form
    const [wordPoem, setWordPoem] = useState([]);


    //state to set the poems on the page
    const [poems, setPoems] = useState([]);

    //the topics returned whatever word the user has clicked and suggests a list of words based on that
    useEffect(() => {
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
}, [userSubmit]);


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
       // inside the loop, we push each book name to an array we already created inside the onValue() function called newState
       newState.push(data[key]);
     }
     // here we use Firebase's .val() method to parse our database info the way we want it
     console.log(response.val());
     setPoems(newState);
   });
  }, []);

    //a function that will detect what is being clicked and adds a word to the empty array.
    const handleSelection = (wordCollection) => {
      //empty array + what was clicked + empty space concat
      setWordPoem([wordPoem + wordCollection.word + (" ")]);
      //changing the state of whatever is being put into the input field
      setWordPoem(wordCollection.target.value);
    }
    console.log(wordPoem)


    //submit button for the 2nd form that will push the poem to firebase.
    const handleSubmit = (event) => {
      event.preventDefault();
       const database = getDatabase(firebase);
       const dbRef = ref(database);

       //push whatever the user has typed
        push(dbRef, wordPoem);

        // reset the state to an empty string
        setWordPoem("");

      
    };

    //looping through 50 words that we get back from the api to display them on the page. 
    //2nd form below
    return (
      <div>
        <ul className="poems">
          {poems.map((poem) => {
            return (
              <li key={poem}>
                <p>{poem}</p>
              </li>
            );
          })}
        </ul>

        {wordCollection.map((wordCollection, index) => {
          return (
            <div key={index} onClick={() => handleSelection(wordCollection)}>
              {wordCollection.word}
            </div>
          );
        })}

        {/* {
>>>>>>> Stashed changes
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
            <input
              type="text"
              id="poem"
              value={wordPoem}
              onChange={handleSelection}
            />

            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
        }

export default GenerateWords

