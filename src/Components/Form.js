const Form = ({
	setAutoFill,
	setUserSubmit,
	setShow,
	autoFill,
	show,
	suggestions,
	userSubmit,
	setErrorState,
}) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		if (userSubmit === "") {
			setErrorState(true);
		}

		setUserSubmit(autoFill);

		setAutoFill("");

		console.log("userSubmit", userSubmit);
	};

	const handleChange = (event) => {
		setErrorState(false);
		setAutoFill(event.target.value.trim());
		setShow(true);
	};

	const handleSelection = (wordObj) => {
		setAutoFill(wordObj.word);
		setShow(false);
	};

	return (
		<>
			<h2>Create your own poem!</h2>
			<h3>First, type a word and we will search for related ones.</h3>
			<form
				onSubmit={(event) => {
					handleSubmit(event);
				}}
				className="searchForm"
			>
				<label htmlFor="search" className="sr-only">
					Search for a word
				</label>
				<div className="inputOptionsContainer">
					<input
						type="search"
						id="search"
						onChange={(event) => {
							handleChange(event);
						}}
						// className="searchInput"
						value={autoFill}
						pattern="[a-zA-z]+"
						placeholder="Start typing a word..."
					/>

					{autoFill !== ""
						? suggestions.map((wordObj, index) => {
								return (
									<option
										key={index}
										style={{ display: show ? "block" : "none" }}
										onClick={() => handleSelection(wordObj)}

										value={wordObj.word}
										className="color"
										tabIndex="0"
									>
										{wordObj.word}
									</option>
								);
						  })
						: null}
				</div>

				<button type="submit">Search</button>
			</form>
		</>
	);
};

export default Form;
