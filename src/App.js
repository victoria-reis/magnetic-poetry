//Modules
// import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

//Config
import AutoComplete from "./Components/AutoComplete";
import Gallery from "./Components/Gallery";
// import GenerateWords from "./Components/GenerateWords";

//styling
import "./Styles/App.css";

function App() {
	return (
		<div className="App">
			<h1>test</h1>
			{/* <AutoComplete /> */}
			<ul>
				<li>
					<Link to="/">Gallery</Link>
				</li>
				<li>
					<Link to="auto">Autocomplete</Link>
				</li>
			</ul>
			<Routes>
				<Route path="/" element={<Gallery />} />
				<Route path="/auto" element={<AutoComplete />} />
			</Routes>
		</div>
	);
}

export default App;
