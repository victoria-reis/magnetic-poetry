//Modules
// import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

//Config
import AutoComplete from "./Components/AutoComplete";
import Gallery from "./Components/Gallery";
import Footer from "./Components/Footer";

//styling
import "./Styles/App.css";

function App() {
	return (
		<div className="App">
			<div className="wrapper">
				<h1>Refrigeration Versification</h1>
				<ul className="navBar">
					<li>
						<Link to="/">Gallery</Link>
					</li>
					<li>
						<Link to="createPoem">Create a poem</Link>
					</li>
				</ul>
				<ToastContainer draggable={true} transition={Zoom} autoClose={8000} />
				<Routes>
					<Route path="/" element={<Gallery />} />
					<Route path="/createPoem" element={<AutoComplete />} />
				</Routes>
				<Footer />
			</div>
		</div>
	);
}

export default App;
