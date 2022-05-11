//Modules
import { useState } from "react";
import { Link, Routes, Route } from 'react-router-dom';

//Config
import AutoComplete from "./Components/AutoComplete";
import GenerateWords from "./Components/GenerateWords";

//styling
import "./Styles/App.css";

function App() {
	return (
		<div className="App">
			<h1>test</h1>
			<AutoComplete />
		</div>
	);
}

export default App;

