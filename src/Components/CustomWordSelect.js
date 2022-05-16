import { useState } from "react";

const CustomWordSelect = ({wordPoem, setWordPoem, rotationRandomizer}) => {
  const [customInput, setCustomInput] = useState("");
  const [customTextBox, setCustomTextBox] = useState([]);
  const [customUserSubmit, setCustomUserSubmit] = useState(false);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customInput !== "") {
      setCustomUserSubmit(true);
      setCustomTextBox([...customTextBox, customInput]);
      setCustomInput("");
    }
  };

  const handleCustomChange = (e) => {
    setCustomInput(e.target.value.trim());
  };
  const handleCustomSelection = (customWord) => {
    console.log(customWord);
    setWordPoem([wordPoem + customWord + " "]);
  };
  return (
    <div>
      <div>
        <form
          className="searchForm"
          onSubmit={(event) => {
            handleCustomSubmit(event);
          }}
        >
          <label htmlFor="search">Custom text</label>
          <div className="inputOptionsContainer">
            <input
              type="search"
              id="search"
              onChange={(e) => {
                handleCustomChange(e);
              }}
              value={customInput}
              placeholder="Add a word"
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="customWordCollection">
        {customUserSubmit !== false ? (
          customTextBox.map((customWord, index) => {
            return (
              <div
                key={index}
                onClick={() => handleCustomSelection(customWord)}
                className={rotationRandomizer()}
              >
                {customWord}
              </div>
            );
          })
        ) : (
          <p>Empty. Please type in a word to add.</p>
        )}
      </div>
    </div>
  );
};

export default CustomWordSelect