import { useState } from "react";

const CustomWordSelect = ({wordPoem, setWordPoem}) => {
  const [customInput, setCustomInput] = useState("");
  const [customTextBox, setCustomTextBox] = useState([]);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (handleCustomSubmit !== "") {
    setCustomTextBox([... customTextBox, customInput]);
    setCustomInput("");
    }
  }

  const handleCustomChange = (e) => {
    setCustomInput(e.target.value.trim());

  }
  const handleCustomSelection = (customWord) => {
    console.log(customWord)
    setWordPoem([wordPoem + customWord + " "]);
  }

  console.log (customTextBox)

  return (
    <div>
      {
      customTextBox.map((customWord, index) => {
        return (
          <div key={index} onClick={() => handleCustomSelection(customWord)}>
            {customWord}
          </div>
        );
      })
      }

      <form
      onSubmit={(event) => {
        handleCustomSubmit(event);
      }}
      >
      <label htmlFor="search">Custom text</label>
      <input
      type="search"
      id="search"
      onChange={(e) => {
        handleCustomChange(e);
      }}
      value={customInput}
      />
      <button type="submit">Add</button>
      </form>

    </div>
    )
};

export default CustomWordSelect