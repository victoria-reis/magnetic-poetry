//Modules
// import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom, } from "react-toastify";

//Config
import AutoComplete from "./Components/AutoComplete";
import Gallery from "./Components/Gallery";
import Footer from "./Components/Footer";
// import GenerateWords from "./Components/GenerateWords";

//styling
import "./Styles/App.css";

function App() {
	return (
		<div className="App">
			<div className="wrapper">
				<h1>Refrigeration Versification</h1>
				<ul className="navBar">
				<ToastContainer 
					draggable={true}
					transition={Zoom}
					autoClose={8000}/>
					
					<li>
						<Link to="/">Gallery</Link>
					</li>
					<li>
						<Link to="createPoem">Create a poem</Link>
					</li>
				</ul>
				<Routes>
					<Route path="/" element={<Gallery />} />
					<Route path="/createPoem" element={<AutoComplete />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
