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
			<div className="wrapper">
				<h1>Refrigeration Versification</h1>
				{/* <AutoComplete /> */}
				<ul className="navBar">
					<li>
						<Link to="/">Gallery</Link>
					</li>
					<li>
						<Link to="auto">Create a poem</Link>
					</li>
				</ul>
				<Routes>
					<Route path="/" element={<Gallery />} />
					<Route path="/auto" element={<AutoComplete />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
