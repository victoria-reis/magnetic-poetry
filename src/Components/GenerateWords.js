import { useEffect, useState } from "react";
import axios from "axios";

const GenerateWords = ({
	userSubmit,
	setUserSubmit,
	autoFill,
	setAutoFill,
}) => {
	const [wordCollection, setWordCollection] = useState([]);
	const [wordPoem, setWordPoem] = useState([]);

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
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [userSubmit]);

	const handleSelection = (wordCollection) => {
		setWordPoem([wordPoem + wordCollection.word + " "]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		setUserSubmit(autoFill);

		setAutoFill("");
	};

	return (
		<div>
			{wordCollection.map((wordCollection, index) => {
				return (
					<div key={index} onClick={() => handleSelection(wordCollection)}>
						{wordCollection.word}
					</div>
				);
			})}

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
					<input type="text" id="poem" value={wordPoem} />

					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default GenerateWords;
