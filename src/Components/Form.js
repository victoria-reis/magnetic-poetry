const Form = ({
	setAutoFill,
	setUserSubmit,
	setShow,
	autoFill,
	show,
	suggestions,
}) => {
	const handleSubmit = (event) => {
		event.preventDefault();

		setUserSubmit(autoFill);

		setAutoFill("");
	};

	const handleChange = (event) => {
		setAutoFill(event.target.value.trim());
		console.log(event.target.value);
		setShow(true);
	};

	const handleSelection = (wordObj) => {
		setAutoFill(wordObj.word);
		setShow(false);
	};

	return (
		<div>
			<form
				onSubmit={(event) => {
					handleSubmit(event);
				}}
			>
				<label htmlFor="search">Search</label>

				<input
					type="search"
					id="search"
					onChange={(event) => {
						handleChange(event);
					}}
					value={autoFill}
				/>

				<button type="submit">Submit</button>

				<div>
					{autoFill !== ""
						? suggestions.map((wordObj, index) => {
								return (
									<option
										key={index}
										style={{ display: show ? "block" : "none" }}
										onClick={() => handleSelection(wordObj)}
										value={wordObj.word}
									>
										{wordObj.word}
									</option>
								);
						  })
						: null}
				</div>
			</form>
		</div>
	);
};

export default Form;
