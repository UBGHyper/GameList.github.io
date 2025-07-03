import React, { useContext } from 'react';
import "./App.css";
import { LightModeContext } from './Components/LightMode/LightModeProvider';
import { GameComponents } from './Components/GameComponents/GameComponents';


function App() {
	const { lightMode, setLightMode } = useContext(LightModeContext);

	const lightModeClass = {
		backgroundColor: lightMode ? "white" : "#253659	",
		color: lightMode ? "black" : "white",

	}


	return (
		<div className="App" style={lightModeClass}>
			<button style={lightModeClass} onClick={() => setLightMode(prev => !prev)}> Light mode</button>
			<GameComponents />
		</div>
	);
}

export default App;
