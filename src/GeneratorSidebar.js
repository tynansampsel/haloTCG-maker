import React from 'react';

import { useRef, useState, useEffect } from "react";


import './css/App.css';
import './css/Generator.css';



function GeneratorSidebar(props) {
	const [unit, setUnit] = useState(false);
	const [action, setAction] = useState(false);
	const [equipment, setEquipment] = useState(false);
	const [effect, setEffect] = useState(false);
	const [token, setToken] = useState(false);
	const [hero, setHero] = useState(false);
	const [building, setBuilding] = useState(false);
	const [trap, setTrap] = useState(false);
	const [cstatic, setCStatic] = useState(false);

	useEffect(() => {
		props.handleTogglesChanged({
			unit: unit,
			action: action,
			equipment: equipment,
			effect: effect,
			token: token,
			hero: hero,
			building: building,
			trap: trap,
			cstatic: trap
		})
	}, [unit,action,equipment,effect,token,hero,building,trap])


	const handleToggle = (button) => {
		console.log(button)
		console.log(unit)

		switch (button) {
			case "unit":
				setUnit(!unit)
				break;
			case "action":
				setAction(!action)
				break;
			case "equipment":
				setEquipment(!equipment)
				break;
			case "effect":
				setEffect(!effect)
				break;
			case "token":
				setToken(!token)
				break;
			case "hero":
				setHero(!hero)
				break;
			case "building":
				setBuilding(!building)
				break;
			case "trap":
				setTrap(!trap)
				break;
			case "cstatic":
				setCStatic(!cstatic)
				break;
		}
	}


	return (
		<div className="GeneratorSidebar">
			<div className="buttonContainer">
				<h1 className={`generator_button button-toggle${unit && ' toggle-on'}`} onClick={() => handleToggle("unit")}>UNIT</h1>
				<h1 className={`generator_button button-toggle${action && ' toggle-on'}`} onClick={() => handleToggle("action")}>ACTION</h1>
				<h1 className={`generator_button button-toggle${equipment && ' toggle-on'}`} onClick={() => handleToggle("equipment")}>EQUIPMENT</h1>
				<h1 className={`generator_button button-toggle${effect && ' toggle-on'}`} onClick={() => handleToggle("effect")}>EFFECT</h1>
				<h1 className={`generator_button button-toggle${token && ' toggle-on'}`} onClick={() => handleToggle("token")}>TOKEN</h1>
				<h1 className={`generator_button button-toggle${hero && ' toggle-on'}`} onClick={() => handleToggle("hero")}>HERO</h1>
				<h1 className={`generator_button button-toggle${building && ' toggle-on'}`} onClick={() => handleToggle("building")}>BUILDING</h1>
				<h1 className={`generator_button button-toggle${trap && ' toggle-on'}`} onClick={() => handleToggle("trap")}>TRAP</h1>
				<h1 className={`generator_button button-toggle${cstatic && ' toggle-on'}`} onClick={() => handleToggle("cstatic")}>STATIC</h1>
			</div>
			<h1 className="generator_button generator_button-generate" onClick={() => props.handleGenerateClicked()}>GENERATE</h1>
			<h1 className="generator_button generator_button-change" onClick={() => props.change()}>SINGULAR</h1>
			{/* <h1 className="button button-change" onClick={() => props.change()}>SINGULAR</h1> */}
		</div>
	);
}

export default GeneratorSidebar;