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
		if (userSubmit.length === 0){
			setErrorState(true)
		}

		setUserSubmit(autoFill);

		setAutoFill("");
	};

	const handleChange = (event) => {
		if (autoFill  !== "") {
			setErrorState(false)
		}
		setAutoFill(event.target.value.trim());
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
					console.log("userSubmit", userSubmit)
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
										className='color'
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
